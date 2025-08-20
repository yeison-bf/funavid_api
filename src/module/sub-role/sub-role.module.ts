import { Module } from '@nestjs/common';
import { SubRolesController } from './sub-role.controller';
import { SubRolesService } from './sub-role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubRole } from './entities/sub-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubRole])],
  controllers: [SubRolesController],
  providers: [SubRolesService],
})
export class SubRoleModule { }
