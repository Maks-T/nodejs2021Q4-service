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

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : `Internal server error : ${String(exception).slice(
            0,
            String(exception).indexOf('\n')
          )}`;

    response.exeption = message;
    const USE_FASTIFY = process.env.USE_FASTIFY.toLowerCase() === 'true';

    const resBody = {
      statusCode,
      message,
    };

    USE_FASTIFY
      ? response.code(statusCode).send(resBody)
      : response.status(statusCode).json(resBody);
  }
}
