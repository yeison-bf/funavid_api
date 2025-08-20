import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFundationDto } from './dto/create-fundation.dto';
import { UpdateFundationDto } from './dto/update-fundation.dto';
import { Fundation } from './entities/fundation.entity';

@Injectable()
export class FundationsService {
  constructor(
    @InjectRepository(Fundation)
    private readonly fundationRepository: Repository<Fundation>,
  ) {}

  async create(createFundationDto: CreateFundationDto) {
    const existing = await this.fundationRepository.findOneBy({
      nit: createFundationDto.nit,
    });

    if (existing) {
      throw new BadRequestException('Ya existe una fundación con ese NIT.');
    }

    const newFundation = this.fundationRepository.create(createFundationDto);
    await this.fundationRepository.save(newFundation);

    return {
      success: true,
      message: 'Fundación creada exitosamente.',
      data: newFundation,
    };
  }

  async findAll() {
    const list = await this.fundationRepository.find();

    return {
      success: true,
      message: 'Lista de fundaciones obtenida correctamente.',
      data: list,
    };
  }

  async findOne(id: number) {
    const fundation = await this.fundationRepository.findOneBy({ id });

    if (!fundation) {
      throw new NotFoundException('No se encontró la fundación con ese ID.');
    }

    return {
      success: true,
      message: 'Fundación obtenida correctamente.',
      data: fundation,
    };
  }

  async update(id: number, updateDto: UpdateFundationDto) {
    const fundation = await this.fundationRepository.findOneBy({ id });

    if (!fundation) {
      throw new NotFoundException('No se encontró la fundación para actualizar.');
    }

    const updated = this.fundationRepository.merge(fundation, updateDto);
    await this.fundationRepository.save(updated);

    return {
      success: true,
      message: 'Fundación actualizada correctamente.',
      data: updated,
    };
  }

  async remove(id: number) {
    const fundation = await this.fundationRepository.findOneBy({ id });

    if (!fundation) {
      throw new NotFoundException('No se encontró la fundación para eliminar.');
    }

    await this.fundationRepository.remove(fundation);

    return {
      success: true,
      message: 'Fundación eliminada exitosamente.',
    };
  }
}
