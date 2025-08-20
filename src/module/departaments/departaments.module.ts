import { Module } from '@nestjs/common';
import { DepartamentsService } from './departaments.service';
import { DepartamentsController } from './departaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departament } from './entities/departament.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Departament])],
  controllers: [DepartamentsController],
  providers: [DepartamentsService],
})
export class DepartamentsModule { }
