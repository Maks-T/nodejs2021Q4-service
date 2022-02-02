import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidIdInterceptor } from './interceptors/valid-id.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;

  const USE_FASTIFY = process.env.USE_FASTIFY.toLowerCase() === 'true';

  const app = USE_FASTIFY
    ? await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
      )
    : await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ValidIdInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Trello Service / RS SCHOOL')
    .setDescription(`Let's try to create a competitor for Trello!`)
    .setVersion('1.0.0')
    .addTag('Andpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/doc', app, document);

  USE_FASTIFY
    ? await app.listen(PORT, '0.0.0.0', () =>
        console.log(`Server started on port = ${PORT} with Fastify adapter`)
      )
    : await app.listen(PORT, () =>
        console.log(`Server started on port = ${PORT} with Express adapter`)
      );
}

bootstrap();
