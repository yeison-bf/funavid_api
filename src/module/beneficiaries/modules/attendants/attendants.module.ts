import { Module } from '@nestjs/common';
import { AttendantsService } from './attendants.service';
import { AttendantsController } from './attendants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendant } from './entities/attendant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attendant])],
  controllers: [AttendantsController],
  providers: [AttendantsService],
})
export class AttendantsModule {}
