import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import YAML from 'yamljs';
import * as swaggerUI from 'swagger-ui-express';

import { StatusCodes } from 'http-status-codes';
import boardRouter from './resources/boards/board.router';
import userRouter from './resources/users/user.router';
import taskRouter from './resources/tasks/task.router';
import handleLoggerInfo from './middlewares/logging-info-middleware';
import { handleLoggerError } from './middlewares/logging-error-middleware';
import WarnLog from './common/warn-log';
import { logger } from './common/logger';

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const app = express();

app.use(express.json());

app.use(handleLoggerInfo);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/', userRouter);
app.use('/', boardRouter);
app.use('/', taskRouter);

app.use('*', () => {
  throw new WarnLog(StatusCodes.NOT_FOUND, `Route not EXIST`);
});

app.use(handleLoggerError);

process.on('uncaughtException', (err: Error) => {
  logger.error(`Uncaught exception ${err.name}:`, err);

  process.exit(1);
});

process.on('unhandledRejection', (err: Error) => {
  logger.error(`Unhandled rejection ${err.name}: ${err.message}`);

  process.exit(1);
});

export default app;
