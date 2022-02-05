import {
  CallHandler,
  ExecutionContext,
  Inject,
  mixin,
  NestInterceptor,
  Optional,
  Type,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import FastifyMulter from 'fastify-multer';
import { Options, Multer } from 'multer';
import { FileInterceptor as ExpressFileInterceptor } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, './../../../.env'),
});

export const USE_FASTIFY =
  !!process.env.USE_FASTIFY && process.env.USE_FASTIFY.toLowerCase() === 'true';

console.log('             USE_FASTIFY                  ', USE_FASTIFY);

type MulterInstance = any;

function FastifyFileInterceptor(
  fieldName: string,
  localOptions: Options
): Type<NestInterceptor> {
  class MixinInterceptor implements NestInterceptor {
    protected multer: MulterInstance;

    constructor(
      @Optional()
      @Inject('MULTER_MODULE_OPTIONS')
      options: Multer
    ) {
      this.multer = (FastifyMulter as any)({ ...options, ...localOptions });
    }

    async intercept(
      context: ExecutionContext,
      next: CallHandler
    ): Promise<Observable<any>> {
      const ctx = context.switchToHttp();

      await new Promise<void>((resolve, reject) =>
        this.multer.single(fieldName)(
          ctx.getRequest(),
          ctx.getResponse(),
          (error: any) => {
            if (error) {
              // const error = transformException(err);
              return reject(error);
            }
            resolve();
          }
        )
      );

      return next.handle();
    }
  }
  const Interceptor = mixin(MixinInterceptor);
  return Interceptor as Type<NestInterceptor>;
}

export const FileInterceptor = USE_FASTIFY
  ? FastifyFileInterceptor
  : ExpressFileInterceptor;
