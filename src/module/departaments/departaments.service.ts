import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departament } from './entities/departament.entity';
import { CreateDepartamentDto } from './dto/create-departament.dto';
import { UpdateDepartamentDto } from './dto/update-departament.dto';

@Injectable()
export class DepartamentsService {
  constructor(
    @InjectRepository(Departament)
    private readonly departamentRepository: Repository<Departament>,
  ) {}

  async create(dto: CreateDepartamentDto) {
    try {
      const departament = this.departamentRepository.create(dto);
      const saved = await this.departamentRepository.save(departament);

      return {
        success: true,
        message: 'Departamento creado correctamente',
        data: saved,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Error al crear el departamento.',
      });
    }
  }

  async findAll() {
    try {
      const data = await this.departamentRepository.find();
      return {
        success: true,
        message: 'Lista de departamentos obtenida correctamente',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Error al obtener los departamentos.',
      });
    }
  }

  async findOne(id: number) {
    const found = await this.departamentRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException({
        success: false,
        message: `No se encontró un departamento con ID ${id}`,
      });
    }

    return {
      success: true,
      message: 'Departamento encontrado correctamente',
      data: found,
    };
  }

  async update(id: number, dto: UpdateDepartamentDto) {
    const found = await this.departamentRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException({
        success: false,
        message: `No se encontró un departamento con ID ${id}`,
      });
    }

    try {
      await this.departamentRepository.update(id, dto);
      const updated = await this.departamentRepository.findOne({ where: { id } });

      return {
        success: true,
        message: 'Departamento actualizado correctamente',
        data: updated,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Error al actualizar el departamento.',
      });
    }
  }

  async remove(id: number) {
    const found = await this.departamentRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException({
        success: false,
        message: `No se encontró un departamento con ID ${id}`,
      });
    }

    try {
      await this.departamentRepository.delete(id);
      return {
        success: true,
        message: 'Departamento eliminado correctamente',
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Error al eliminar el departamento.',
      });
    }
  }
}
