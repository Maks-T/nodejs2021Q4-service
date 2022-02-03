import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidIdInterceptor } from './interceptors/valid-id.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import fastifyMultipart from 'fastify-multipart';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;

  const USE_FASTIFY = process.env.USE_FASTIFY.toLowerCase() === 'true';

  const createApp = async () => {
    if (USE_FASTIFY) {
      const adapter = new FastifyAdapter();

      adapter.register(fastifyMultipart, {
        limits: {
          fieldNameSize: 100, // Max field name size in bytes
          fieldSize: 1000000, // Max field value size in bytes
          fields: 10, // Max number of non-file fields
          fileSize: 100, // For multipart forms, the max file size
          files: 1, // Max number of file fields
          headerPairs: 2000, // Max number of header key=>value pairs
        },
      });

      return await NestFactory.create<NestFastifyApplication>(
        AppModule,
        adapter
      );
    } else {
      return await NestFactory.create(AppModule);
    }
  };

  const app = await createApp();

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
