import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // CORS
  app.enableCors();

  // Swagger Config
  const config = new DocumentBuilder()
    .setTitle('Teste FazPay')
    .setDescription('Teste FazPay')
    .setVersion('2.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const port = app.get(ConfigService).get<number>('PORT') || 3001;
  await app.listen(port);
}
bootstrap();
