import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Code Quest - 2024')
    .setDescription(
      'Desarrollar una aplicación web que proporcione a la comunidad de DevTalles una herramienta versátil para realizar sorteos en cualquier momento.',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/doc', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableCors();

  await app.listen(process.env.APP_PORT || 3000, process.env.APP_HOST);

  logger.log(`Server running on ${await app.getUrl()}`);
}
bootstrap();
