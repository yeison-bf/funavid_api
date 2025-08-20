import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });   

  // Aumentar límite de payload
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  // Validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  
  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Fundations API')
    .setDescription('Documentación de la API para gestión de fundaciones')
    .setVersion('1.0')
    .addTag('fundations')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // disponible en /api

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`✅ Servidor iniciado en http://localhost:${port}`);
  console.log(`📘 Swagger disponible en http://localhost:${port}/api`);
}

bootstrap();
