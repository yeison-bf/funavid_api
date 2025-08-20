import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const newRole = this.roleRepository.create(createRoleDto);
      const savedRole = await this.roleRepository.save(newRole);
      return {
        success: true,
        message: 'Rol creado exitosamente',
        data: savedRole,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Error al crear el rol. Verifique los datos o contacte al administrador.',
      });
    }
  }

  async findAll() {
    try {
      const roles = await this.roleRepository.find();
      return {
        success: true,
        message: 'Lista de roles obtenida correctamente',
        data: roles,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Error al obtener los roles.',
      });
    }
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException({
        success: false,
        message: `No se encontró un rol con ID ${id}`,
      });
    }

    return {
      success: true,
      message: 'Rol encontrado correctamente',
      data: role,
    };
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException({
        success: false,
        message: `No se encontró un rol con ID ${id}`,
      });
    }

    try {
      await this.roleRepository.update(id, updateRoleDto);
      const updated = await this.roleRepository.findOne({ where: { id } });

      return {
        success: true,
        message: 'Rol actualizado correctamente',
        data: updated,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Error al actualizar el rol. Verifique los datos.',
      });
    }
  }

  async remove(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException({
        success: false,
        message: `No se encontró un rol con ID ${id}`,
      });
    }

    try {
      await this.roleRepository.delete(id);
      return {
        success: true,
        message: 'Rol eliminado correctamente',
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Error al eliminar el rol.',
      });
    }
  }
}
