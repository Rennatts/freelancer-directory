import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe(
    //{ whitelist: true , forbidNonWhitelisted: true}
  ));

  const config = new DocumentBuilder()
  .setTitle('Directory')
  .setDescription('directory API documentation')
  .setVersion('1.0')
  .addTag('freelancers')
  .addTag('users')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();