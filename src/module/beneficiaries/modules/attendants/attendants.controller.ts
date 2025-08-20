import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { AttendantsService } from './attendants.service';
import { CreateAttendantDto } from './dto/create-attendant.dto';
import { UpdateAttendantDto } from './dto/update-attendant.dto';

@Controller('attendants')
export class AttendantsController {
  constructor(private readonly attendantsService: AttendantsService) {}

  // Crear un acudiente
  @Post()
  async create(@Body() createAttendantDto: CreateAttendantDto) {
    try {
      const response = await this.attendantsService.create(createAttendantDto);
      return {
        success: true,
        message: 'Acudiente creado exitosamente',
        data: response,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al crear el acudiente',
          error: error?.message || 'Error interno del servidor',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Obtener todos los acudientes
  @Get()
  async findAll() {
    try {
      const data = await this.attendantsService.findAll();
      return {
        success: true,
        message: 'Lista de acudientes obtenida correctamente',
        data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener los acudientes',
          error: error?.message || 'Error interno del servidor',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Obtener un acudiente por ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const data = await this.attendantsService.findOne(id);
      return {
        success: true,
        message: 'Acudiente obtenido correctamente',
        data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener el acudiente',
          error: error?.message || 'Error interno del servidor',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Actualizar un acudiente
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAttendantDto: UpdateAttendantDto,
  ) {
    try {
      const data = await this.attendantsService.update(id, updateAttendantDto);
      return {
        success: true,
        message: 'Acudiente actualizado correctamente',
        data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al actualizar el acudiente',
          error: error?.message || 'Error interno del servidor',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Eliminar un acudiente
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const data = await this.attendantsService.remove(id);
      return {
        success: true,
        message: 'Acudiente eliminado correctamente',
        data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al eliminar el acudiente',
          error: error?.message || 'Error interno del servidor',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
