import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubRoleDto } from './dto/create-sub-role.dto';
import { UpdateSubRoleDto } from './dto/update-sub-role.dto';
import { SubRole } from './entities/sub-role.entity';

@Injectable()
export class SubRolesService {
  constructor(
    @InjectRepository(SubRole)
    private readonly subRoleRepository: Repository<SubRole>,
  ) {}

  async create(createSubRoleDto: CreateSubRoleDto) {
    try {
      const newSubRole = this.subRoleRepository.create(createSubRoleDto);
      const saved = await this.subRoleRepository.save(newSubRole);

      return {
        success: true,
        message: 'SubRol creado correctamente',
        data: saved,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Error al crear el subrol. Verifique los datos.',
      });
    }
  }

  async findAll() {
    try {
      const result = await this.subRoleRepository.find();
      return {
        success: true,
        message: 'Lista de SubRoles obtenida correctamente',
        data: result,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Error al obtener los SubRoles.',
      });
    }
  }

  async findOne(id: number) {
    const result = await this.subRoleRepository.findOne({ where: { id } });

    if (!result) {
      throw new NotFoundException({
        success: false,
        message: `No se encontró un SubRol con ID ${id}`,
      });
    }

    return {
      success: true,
      message: 'SubRol encontrado correctamente',
      data: result,
    };
  }

  async update(id: number, updateSubRoleDto: UpdateSubRoleDto) {
    const exists = await this.subRoleRepository.findOne({ where: { id } });

    if (!exists) {
      throw new NotFoundException({
        success: false,
        message: `No se encontró un SubRol con ID ${id}`,
      });
    }

    try {
      await this.subRoleRepository.update(id, updateSubRoleDto);
      const updated = await this.subRoleRepository.findOne({ where: { id } });

      return {
        success: true,
        message: 'SubRol actualizado correctamente',
        data: updated,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Error al actualizar el SubRol.',
      });
    }
  }

  async remove(id: number) {
    const exists = await this.subRoleRepository.findOne({ where: { id } });

    if (!exists) {
      throw new NotFoundException({
        success: false,
        message: `No se encontró un SubRol con ID ${id}`,
      });
    }

    try {
      await this.subRoleRepository.delete(id);
      return {
        success: true,
        message: 'SubRol eliminado correctamente',
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Error al eliminar el SubRol.',
      });
    }
  }
}
