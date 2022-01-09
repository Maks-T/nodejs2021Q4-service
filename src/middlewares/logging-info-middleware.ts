import { NextFunction, Response, Request } from 'express';

import { finished } from 'stream';
import { logger } from '../common/logger';

const parseInfo = (req: Request, res: Response): string => {
  const { url } = req;
  const query = req.query ? JSON.stringify(req.query) : 'none';
  const body = req.body ? JSON.stringify(req.body) : 'none';
  const { method } = req;
  const { statusCode } = res;

  return `Method: ${method}, URl: ${url}, query: ${query}, body: ${body}, statusCode: ${statusCode}`;
};

const handleLoggerInfo = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next();
  finished(res, () => {
    logger.info(parseInfo(req, res));
  });
};

export default handleLoggerInfo;
