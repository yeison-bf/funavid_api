import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BeneficiariesService } from './beneficiaries.service';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';

@Controller('beneficiaries')
export class BeneficiariesController {
  constructor(private readonly beneficiariesService: BeneficiariesService) {}

  // Crear beneficiario
  @Post()
  async create(@Body() createBeneficiaryDto: CreateBeneficiaryDto) {
    try {
      const beneficiary = await this.beneficiariesService.create(createBeneficiaryDto);
      return {
        success: true,
        message: 'Beneficiario creado exitosamente',
        data: beneficiary,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al crear el beneficiario',
          error: error?.message || 'Error interno del servidor',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Obtener todos los beneficiarios
  @Get()
  async findAll() {
    try {
      const beneficiaries = await this.beneficiariesService.findAll();
      return {
        success: true,
        message: 'Lista de beneficiarios obtenida correctamente',
        data: beneficiaries,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener los beneficiarios',
          error: error?.message || 'Error interno del servidor',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Obtener un beneficiario por ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const beneficiary = await this.beneficiariesService.findOne(id);
      return {
        success: true,
        message: 'Beneficiario encontrado correctamente',
        data: beneficiary,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: `Error al obtener el beneficiario con ID ${id}`,
          error: error?.message || 'Error interno del servidor',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Actualizar un beneficiario
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateDto: CreateBeneficiaryDto) {
    try {
      const updated = await this.beneficiariesService.update(id, updateDto);
      return {
        success: true,
        message: 'Beneficiario actualizado correctamente',
        data: updated,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: `Error al actualizar el beneficiario con ID ${id}`,
          error: error?.message || 'Error interno del servidor',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Eliminar un beneficiario
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.beneficiariesService.remove(id);
      return {
        success: true,
        message: 'Beneficiario eliminado correctamente',
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: `Error al eliminar el beneficiario con ID ${id}`,
          error: error?.message || 'Error interno del servidor',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
