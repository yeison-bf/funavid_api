import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendant } from './entities/attendant.entity';
import { CreateAttendantDto } from './dto/create-attendant.dto';
import { UpdateAttendantDto } from './dto/update-attendant.dto';

@Injectable()
export class AttendantsService {
  constructor(
    @InjectRepository(Attendant)
    private readonly attendantRepository: Repository<Attendant>,
  ) {}

  async create(createAttendantDto: CreateAttendantDto) {
    try {
      const newAttendant = this.attendantRepository.create(createAttendantDto);
      const savedAttendant = await this.attendantRepository.save(newAttendant);

      return {
        success: true,
        message: 'Acudiente creado exitosamente',
        data: savedAttendant,
      };
    } catch (error) {
      return this.handleDatabaseError(error);
    }
  }

  async findAll() {
    try {
      const attendants = await this.attendantRepository.find();
      return {
        success: true,
        message: 'Lista de acudientes obtenida exitosamente',
        data: attendants,
      };
    } catch (error) {
      throw new HttpException({
        success: false,
        message: 'Error al obtener los acudientes',
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const attendant = await this.attendantRepository.findOne({ where: { id } });

      if (!attendant) {
        throw new HttpException({
          success: false,
          message: 'Acudiente no encontrado',
        }, HttpStatus.NOT_FOUND);
      }

      return {
        success: true,
        message: 'Acudiente encontrado exitosamente',
        data: attendant,
      };
    } catch (error) {
      throw new HttpException({
        success: false,
        message: 'Error al buscar el acudiente',
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateAttendantDto: UpdateAttendantDto) {
    try {
      const result = await this.attendantRepository.update(id, updateAttendantDto);

      if (result.affected === 0) {
        return {
          success: false,
          message: 'Acudiente no encontrado o sin cambios',
        };
      }

      const updated = await this.attendantRepository.findOne({ where: { id } });

      return {
        success: true,
        message: 'Acudiente actualizado exitosamente',
        data: updated,
      };
    } catch (error) {
      return this.handleDatabaseError(error);
    }
  }

  async remove(id: number) {
    try {
      const result = await this.attendantRepository.delete(id);

      if (result.affected === 0) {
        return {
          success: false,
          message: 'Acudiente no encontrado',
        };
      }

      return {
        success: true,
        message: 'Acudiente eliminado exitosamente',
      };
    } catch (error) {
      throw new HttpException({
        success: false,
        message: 'Error al eliminar el acudiente',
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private handleDatabaseError(error: any) {
    if (error.code === '23505') {
      // Violación de restricción única
      return {
        success: false,
        message: 'Ya existe un acudiente con esos datos únicos',
      };
    }

    if (error.code === '23503') {
      // Violación de clave foránea
      return {
        success: false,
        message: 'Error de relación con el beneficiario (clave foránea inválida)',
      };
    }

    return {
      success: false,
      message: 'Error interno en la base de datos',
      error: error.message,
    };
  }
}
