import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AppService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  runHandleSpecialError() {
    process.on('uncaughtException', (err: Error) => {
      this.logger.error(`Uncaught exception ${err.name}:`, err);
      setTimeout(() => {
        process.exit(1);
      }, 1500);
    });

    process.on('unhandledRejection', (err: Error) => {
      this.logger.error(`Unhandled rejection ${err.name}: ${err.message}`);
      setTimeout(() => {
        process.exit(1);
      }, 1500);
    });
  }
}
