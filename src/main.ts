import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // URI Versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('v1');
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  // Config for Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('SCG Status API')
    .setDescription('API Description for SCG Status')
    .setVersion('1.0')
    .addCookieAuth('access_token', {
      type: 'http',
      in: 'Header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  app.use(cookieParser());
  await app.listen(8000);
}
bootstrap();
