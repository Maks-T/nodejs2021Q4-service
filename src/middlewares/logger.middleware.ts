import { Injectable, Inject, NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express';
import { finished } from 'stream';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  use(req: Request, res: Response, next: () => void) {
    next();
    finished(res, () => {
      const code = Math.trunc(res.statusCode / 100);

      switch (code) {
        case 4: {
          this.logger.warn(this.parseInfo(req, res));
          break;
        }
        case 5: {
          this.logger.error(this.parseInfo(req, res));
          break;
        }
        default: {
          this.logger.info(this.parseInfo(req, res));
        }
      }
    });
  }

  parseInfo = (req: Request, res: Response): string => {
    const { url } = req;
    const query = req.query ? JSON.stringify(req.query) : 'none';
    const body = req.body ? JSON.stringify(req.body) : 'none';
    const { method } = req;
    const { statusCode } = res;

    const exeption = res['exeption'] || 'none';

    return `Method: ${method}, URl: ${url}, query: ${query}, body: ${body}, statusCode: ${statusCode}, exeption : ${exeption}`;
  };
}
