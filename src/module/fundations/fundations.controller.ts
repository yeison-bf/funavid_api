import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FundationsService } from './fundations.service';
import { CreateFundationDto } from './dto/create-fundation.dto';
import { UpdateFundationDto } from './dto/update-fundation.dto';

@Controller('fundations')
export class FundationsController {
  constructor(private readonly fundationsService: FundationsService) {}

  @Post()
  create(@Body() createFundationDto: CreateFundationDto) {
    return this.fundationsService.create(createFundationDto);
  }

  @Get()
  findAll() {
    return this.fundationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fundationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFundationDto: UpdateFundationDto,
  ) {
    return this.fundationsService.update(id, updateFundationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fundationsService.remove(id);
  }
}
