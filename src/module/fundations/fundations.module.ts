import { Module } from '@nestjs/common';
import { FundationsService } from './fundations.service';
import { FundationsController } from './fundations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fundation } from './entities/fundation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fundation])],  // <<<<< IMPORTAR EL REPOSITORIO
  controllers: [FundationsController],
  providers: [FundationsService],
})
export class FundationsModule { }
