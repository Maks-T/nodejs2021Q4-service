import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorLog from '../common/error-log';
import { logger } from '../common/logger';
import WarnLog from '../common/warn-log';

export const handleLoggerError = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log('err instanceof WarnLog', err instanceof WarnLog);
  if (err instanceof WarnLog) {
    logger.warn(`Status code: ${err.statusCode}`, err);
    res.status(err.statusCode).send({
      statusCode: err.statusCode,
      message: err.message,
    });
  } else if (err instanceof ErrorLog) {
    logger.error(`Status code: ${err.statusCode}.`, err);
    res.status(err.statusCode).send({
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    logger.error(`Status code: 500. Internal Server Error.`, err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Internal Server Error',
      message: err.message,
    });
  }
  next();
};
