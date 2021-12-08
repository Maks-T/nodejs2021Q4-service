import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import YAML from 'yamljs';
import * as swaggerUI from 'swagger-ui-express';

import boardRouter from './resources/boards/board.router';
import userRouter from './resources/users/user.router';
import taskRouter from './resources/tasks/task.router';

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const app = express();

app.use(express.json());

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

export default app;
