import { Module } from '@nestjs/common';
import { BeneficiariesService } from './beneficiaries.service';
import { BeneficiariesController } from './beneficiaries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beneficiary } from './entities/beneficiary.entity';
import { AttendantsModule } from './modules/attendants/attendants.module';

@Module({
  imports: [TypeOrmModule.forFeature([Beneficiary]), AttendantsModule],
  controllers: [BeneficiariesController],
  providers: [BeneficiariesService],
})
export class BeneficiariesModule {}
