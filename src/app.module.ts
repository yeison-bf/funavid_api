import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './module/users/users.module';
import { RolesModule } from './module/roles/roles.module';
import { SubRoleModule } from './module/sub-role/sub-role.module';
import { FundationsModule } from './module/fundations/fundations.module';
import { DepartamentsModule } from './module/departaments/departaments.module';
import { join } from 'path';
import { BeneficiariesModule } from './module/beneficiaries/beneficiaries.module';

@Module({
  imports: [
    // Cargar variables del .env
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '..', 'config', 'env', `${process.env.NODE_ENV || 'dev'}.env`),
      isGlobal: true,
    }),

    // Conexión a la base de datos PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
     useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [join(__dirname, '**', '*.{ts,js}')],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        logging: configService.get<boolean>('DB_LOGGING'),
        ssl: configService.get<string>('DB_SSL') === 'true' ? 
          { rejectUnauthorized: false } : 
          false,
      }),
    }),

    // Tus módulos de negocio
    UsersModule,
    RolesModule,
    SubRoleModule,
    FundationsModule,
    DepartamentsModule,
    BeneficiariesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
