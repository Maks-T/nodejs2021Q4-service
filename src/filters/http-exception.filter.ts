import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.message || exception.message?.['error']
        : 'Internal server error : ' +
          String(exception).slice(0, String(exception).indexOf('\n'));

    response['exeption'] = message;
    const USE_FASTIFY = process.env.USE_FASTIFY.toLowerCase() === 'true';

    USE_FASTIFY
      ? response.code(status).send({
          statusCode,
          message,
        })
      : response.status(status).json({
          statusCode,
          message,
        });
  }
}
