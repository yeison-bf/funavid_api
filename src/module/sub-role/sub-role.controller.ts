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
import { CreateSubRoleDto } from './dto/create-sub-role.dto';
import { UpdateSubRoleDto } from './dto/update-sub-role.dto';
import { SubRolesService } from './sub-role.service';

@Controller('sub-roles')
export class SubRolesController {
  constructor(private readonly subRolesService: SubRolesService) {}

  @Post()
  create(@Body() dto: CreateSubRoleDto) {
    return this.subRolesService.create(dto);
  }

  @Get()
  findAll() {
    return this.subRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subRolesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSubRoleDto,
  ) {
    return this.subRolesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.subRolesService.remove(id);
  }
}
