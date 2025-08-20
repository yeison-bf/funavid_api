import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Fundation } from '../fundations/entities/fundation.entity';
import { Departament } from '../departaments/entities/departament.entity';
import { Role } from '../roles/entities/role.entity';
import { SubRole } from '../sub-role/entities/sub-role.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Fundation)
    private readonly foundationRepository: Repository<Fundation>,
    @InjectRepository(Departament)
    private readonly departmentRepository: Repository<Departament>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(SubRole)
    private readonly subroleRepository: Repository<SubRole>,

    private readonly jwtService: JwtService,

  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      // Verificar si el email ya existe
      const existingUserByEmail = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (existingUserByEmail) {
        throw new ConflictException({
          success: false,
          message: 'Ya existe un usuario con este correo electrónico',
        });
      }

      // Verificar si el documento ya existe
      const existingUserByDocument = await this.userRepository.findOne({
        where: {
          documentType: createUserDto.documentType,
          documentNumber: createUserDto.documentNumber
        },
      });
      if (existingUserByDocument) {
        throw new ConflictException({
          success: false,
          message: 'Ya existe un usuario con este tipo y número de documento',
        });
      }

      // Validar edad mínima (18 años)
      const birthDate = new Date(createUserDto.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (age < 18 || (age === 18 && monthDiff < 0) ||
        (age === 18 && monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        throw new BadRequestException({
          success: false,
          message: 'El usuario debe ser mayor de 18 años',
        });
      }

      // Crear nuevo usuario
      const user = this.userRepository.create({
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 12),
        birthDate,
      });

      // Asignar relaciones si existen
      if (createUserDto.foundationId) {
        const foundation = await this.foundationRepository.findOne({
          where: { id: +createUserDto.foundationId },

        });
        if (!foundation) {
          throw new NotFoundException({
            success: false,
            message: 'La fundación especificada no existe',
          });
        }
        user.foundation = foundation;
      }

      if (createUserDto.departmentId) {
        const department = await this.departmentRepository.findOne({
          where: { id: +createUserDto.departmentId },
        });
        if (!department) {
          throw new NotFoundException({
            success: false,
            message: 'El departamento especificado no existe',
          });
        }
        user.department = department;
      }

      if (createUserDto.roleIds && createUserDto.roleIds.length > 0) {
        const roles = await this.roleRepository.findByIds(createUserDto.roleIds);
        if (roles.length !== createUserDto.roleIds.length) {
          throw new NotFoundException({
            success: false,
            message: 'Uno o más roles especificados no existen',
          });
        }
        user.roles = roles;
      }

      if (createUserDto.subroleIds && createUserDto.subroleIds.length > 0) {
        const subroles = await this.subroleRepository.findByIds(createUserDto.subroleIds);
        if (subroles.length !== createUserDto.subroleIds.length) {
          throw new NotFoundException({
            success: false,
            message: 'Uno o más subroles especificados no existen',
          });
        }
        user.subroles = subroles;
      }

      const savedUser = await this.userRepository.save(user);

      // Obtener el usuario completo con relaciones
      const completeUser = await this.findOne(savedUser.id);

      return {
        success: true,
        message: 'Usuario creado exitosamente',
        data: completeUser,
      };
    } catch (error) {
      if (error instanceof ConflictException ||
        error instanceof NotFoundException ||
        error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        success: false,
        message: 'Error al crear el usuario',
        error: error.message,
      });
    }
  }


  // Método para validar usuario y contraseña y retornar token
  async login(email: string, password: string) {
    // Buscar usuario por email, con password (select: false en entidad, hay que seleccionarlo manualmente)
    const user = await this.userRepository.findOne({
      where: { email },
      select: [
        'id',
        'email',
        'password',
        'firstName',
        'lastName',
        'documentType',
        'documentNumber',
        'gender',
        'address',
        'profession',
        'birthDate',
        'phone',
        'isActive',
        'createdAt',
        'updatedAt',
      ],
      relations: ['foundation', 'department', 'roles', 'subroles'],
    });

    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    // Validar contraseña
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    // Eliminar el password del objeto para no enviarlo en el token
    delete user.password;

    // Crear el payload del token (puedes agregar lo que quieras)
    const payload = {
      user
    };

    // Generar token JWT
    const token = this.jwtService.sign(payload);

    return { token };
  }






  async findAll() {
    try {
      const users = await this.userRepository.find({
        relations: ['foundation', 'department', 'roles', 'subroles'],
        order: { createdAt: 'DESC' },
      });

      return {
        success: true,
        message: 'Usuarios obtenidos exitosamente',
        data: users,
        count: users.length,
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al obtener los usuarios',
        error: error.message,
      });
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['foundation', 'department', 'roles', 'subroles'],
      });

      if (!user) {
        throw new NotFoundException({
          success: false,
          message: 'Usuario no encontrado',
        });
      }

      return {
        success: true,
        message: 'Usuario obtenido exitosamente',
        data: user,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException({
        success: false,
        message: 'Error al obtener el usuario',
        error: error.message,
      });
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        relations: ['foundation', 'department', 'roles', 'subroles'],
        select: ['id', 'email', 'password', 'firstName', 'lastName', 'isActive'],
      });

      if (!user) {
        throw new NotFoundException({
          success: false,
          message: 'Usuario no encontrado',
        });
      }

      return {
        success: true,
        message: 'Usuario obtenido exitosamente',
        data: user,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException({
        success: false,
        message: 'Error al obtener el usuario',
        error: error.message,
      });
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['foundation', 'department', 'roles', 'subroles'],
      });

      if (!user) {
        throw new NotFoundException({
          success: false,
          message: 'Usuario no encontrado',
        });
      }

      // Verificar email único si se está actualizando
      if (updateUserDto.email && updateUserDto.email !== user.email) {
        const existingUser = await this.userRepository.findOne({
          where: { email: updateUserDto.email },
        });
        if (existingUser) {
          throw new ConflictException({
            success: false,
            message: 'Ya existe un usuario con este correo electrónico',
          });
        }
      }

      // Verificar documento único si se está actualizando
      if ((updateUserDto.documentType || updateUserDto.documentNumber) &&
        (updateUserDto.documentType !== user.documentType ||
          updateUserDto.documentNumber !== user.documentNumber)) {
        const documentType = updateUserDto.documentType || user.documentType;
        const documentNumber = updateUserDto.documentNumber || user.documentNumber;

        const existingUser = await this.userRepository.findOne({
          where: {
            documentType,
            documentNumber,
          },
        });
        if (existingUser && existingUser.id !== id) {
          throw new ConflictException({
            success: false,
            message: 'Ya existe un usuario con este tipo y número de documento',
          });
        }
      }

      // Validar edad si se actualiza fecha de nacimiento
      if (updateUserDto.birthDate) {
        const birthDate = new Date(updateUserDto.birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (age < 18 || (age === 18 && monthDiff < 0) ||
          (age === 18 && monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          throw new BadRequestException({
            success: false,
            message: 'El usuario debe ser mayor de 18 años',
          });
        }
      }

      // Actualizar relaciones
      if (updateUserDto.foundationId !== undefined) {
        if (updateUserDto.foundationId) {
          const foundation = await this.foundationRepository.findOne({
            where: { id: +updateUserDto.foundationId },
          });
          if (!foundation) {
            throw new NotFoundException({
              success: false,
              message: 'La fundación especificada no existe',
            });
          }
          user.foundation = foundation;
        } else {
          user.foundation = null;
        }
      }

      if (updateUserDto.departmentId !== undefined) {
        if (updateUserDto.departmentId) {
          const department = await this.departmentRepository.findOne({
            where: { id: +updateUserDto.departmentId },
          });
          if (!department) {
            throw new NotFoundException({
              success: false,
              message: 'El departamento especificado no existe',
            });
          }
          user.department = department;
        } else {
          user.department = null;
        }
      }

      if (updateUserDto.roleIds !== undefined) {
        if (updateUserDto.roleIds && updateUserDto.roleIds.length > 0) {
          const roles = await this.roleRepository.findByIds(updateUserDto.roleIds);
          if (roles.length !== updateUserDto.roleIds.length) {
            throw new NotFoundException({
              success: false,
              message: 'Uno o más roles especificados no existen',
            });
          }
          user.roles = roles;
        } else {
          user.roles = [];
        }
      }

      if (updateUserDto.subroleIds !== undefined) {
        if (updateUserDto.subroleIds && updateUserDto.subroleIds.length > 0) {
          const subroles = await this.subroleRepository.findByIds(updateUserDto.subroleIds);
          if (subroles.length !== updateUserDto.subroleIds.length) {
            throw new NotFoundException({
              success: false,
              message: 'Uno o más subroles especificados no existen',
            });
          }
          user.subroles = subroles;
        } else {
          user.subroles = [];
        }
      }

      // Actualizar campos básicos
      Object.assign(user, {
        ...updateUserDto,
        birthDate: updateUserDto.birthDate ? new Date(updateUserDto.birthDate) : user.birthDate,
      });

      const updatedUser = await this.userRepository.save(user);

      return {
        success: true,
        message: 'Usuario actualizado exitosamente',
        data: updatedUser,
      };
    } catch (error) {
      if (error instanceof NotFoundException ||
        error instanceof ConflictException ||
        error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        success: false,
        message: 'Error al actualizar el usuario',
        error: error.message,
      });
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException({
          success: false,
          message: 'Usuario no encontrado',
        });
      }

      await this.userRepository.remove(user);

      return {
        success: true,
        message: 'Usuario eliminado exitosamente',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException({
        success: false,
        message: 'Error al eliminar el usuario',
        error: error.message,
      });
    }
  }

  async changePassword(id: number, newPassword: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException({
          success: false,
          message: 'Usuario no encontrado',
        });
      }

      user.password = await bcrypt.hash(newPassword, 12);
      await this.userRepository.save(user);

      return {
        success: true,
        message: 'Contraseña actualizada exitosamente',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException({
        success: false,
        message: 'Error al cambiar la contraseña',
        error: error.message,
      });
    }
  }

  async toggleStatus(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException({
          success: false,
          message: 'Usuario no encontrado',
        });
      }

      user.isActive = !user.isActive;
      const updatedUser = await this.userRepository.save(user);

      return {
        success: true,
        message: `Usuario ${updatedUser.isActive ? 'activado' : 'desactivado'} exitosamente`,
        data: updatedUser,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException({
        success: false,
        message: 'Error al cambiar el estado del usuario',
        error: error.message,
      });
    }
  }


}