import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Fundation } from '../fundations/entities/fundation.entity';
import { Role } from '../roles/entities/role.entity';
import { SubRole } from '../sub-role/entities/sub-role.entity';
import { Departament } from '../departaments/entities/departament.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // Usa variable de entorno para producción
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User, Fundation, Role, SubRole, Departament])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
