import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beneficiary } from './entities/beneficiary.entity';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { validate } from 'class-validator';

@Injectable()
export class BeneficiariesService {
  constructor(
    @InjectRepository(Beneficiary)
    private readonly beneficiaryRepository: Repository<Beneficiary>,
  ) {}

  // Crear un beneficiario
async create(createDto: CreateBeneficiaryDto) {
  try {
    const beneficiary = this.beneficiaryRepository.create(createDto);
    const saved = await this.beneficiaryRepository.save(beneficiary);

    return {
      success: true,
      message: 'Beneficiario creado exitosamente',
      data: saved,
    };
  } catch (error) {
    if (error.code === '23505') {
      return {
        success: false,
        message: 'Ya existe un beneficiario con esos datos únicos',
      };
    }

    if (error.code === '23503') {
      return {
        success: false,
        message: 'Error de relación con otros datos (clave foránea no válida)',
      };
    }

    return {
      success: false,
      message: 'Error interno al crear el beneficiario',
      data: error.message,
    };
  }
}


  // Obtener todos los beneficiarios
  async findAll() {
    try {
      const beneficiaries = await this.beneficiaryRepository.find();

      return {
        success: true,
        message: 'Lista de beneficiarios obtenida correctamente',
        data: beneficiaries,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error interno al obtener los beneficiarios',
        data: error.message,
      };
    }
  }

  // Obtener un beneficiario por ID
  async findOne(id: number) {
    try {
      const beneficiary = await this.beneficiaryRepository.findOne({ where: { id } });

      if (!beneficiary) {
        return {
          success: false,
          message: `No se encontró un beneficiario con el ID ${id}`,
        };
      }

      return {
        success: true,
        message: 'Beneficiario obtenido correctamente',
        data: beneficiary,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error interno al obtener el beneficiario con ID ${id}`,
        data: error.message,
      };
    }
  }

  // Actualizar un beneficiario
  async update(id: number, updateDto: CreateBeneficiaryDto) {
    try {
      const beneficiary = await this.beneficiaryRepository.findOne({ where: { id } });

      if (!beneficiary) {
        return {
          success: false,
          message: `No se encontró un beneficiario con el ID ${id}`,
        };
      }

      const updated = Object.assign(beneficiary, updateDto);

      // const errors = await validate(updated);
      // if (errors.length > 0) {
      //   const validationErrors = errors.map(err => Object.values(err.constraints)).flat();
      //   return {
      //     success: false,
      //     message: 'Errores de validación al actualizar',
      //     data: validationErrors,
      //   };
      // }

      const saved = await this.beneficiaryRepository.save(updated);

      return {
        success: true,
        message: 'Beneficiario actualizado correctamente',
        data: saved,
      };
    } catch (error) {
      if (error.code === '23505') {
        return {
          success: false,
          message: 'Ya existe un beneficiario con esos datos únicos',
        };
      }

      if (error.code === '23503') {
        return {
          success: false,
          message: 'Error de relación con otros datos (clave foránea no válida)',
        };
      }

      return {
        success: false,
        message: `Error interno al actualizar el beneficiario con ID ${id}`,
        data: error.message,
      };
    }
  }

  // Eliminar un beneficiario
  async remove(id: number) {
    try {
      const beneficiary = await this.beneficiaryRepository.findOne({ where: { id } });

      if (!beneficiary) {
        return {
          success: false,
          message: `No se encontró un beneficiario con el ID ${id}`,
        };
      }

      await this.beneficiaryRepository.remove(beneficiary);

      return {
        success: true,
        message: 'Beneficiario eliminado correctamente',
      };
    } catch (error) {
      return {
        success: false,
        message: `Error interno al eliminar el beneficiario con ID ${id}`,
        data: error.message,
      };
    }
  }
}
