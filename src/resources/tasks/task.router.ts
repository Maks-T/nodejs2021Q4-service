import { Router } from 'express';
import taskController from './task.controller';

const taskRouter = Router();

taskRouter.get('/boards/:boardId/tasks/', taskController.getAll);

taskRouter.get('/boards/:boardId/tasks/:taskId/', taskController.getTask);

taskRouter.post('/boards/:boardId/tasks/', taskController.postTask);

taskRouter.put('/boards/:boardId/tasks/:taskId/', taskController.putTask);

taskRouter.delete('/boards/:boardId/tasks/:taskId/', taskController.deleteTask);

export default taskRouter;
