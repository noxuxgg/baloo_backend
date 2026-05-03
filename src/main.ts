import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // habilitando (validacones) con class-validation
  app.useGlobalPipes(new ValidationPipe())

  // habilitando (DOCS API) con swagger

  const config = new DocumentBuilder()
  .setTitle("Proyecto BACKEND BALOO")
  .setDescription("Backend para la aplicación de repostería Baloo")
  .setVersion("1.0")
  .addTag("Backend Nest")
  .addBearerAuth()
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
