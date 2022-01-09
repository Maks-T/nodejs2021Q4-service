import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import taskController from './task.controller';

const taskRouter = Router();

taskRouter.get('/boards/:boardId/tasks/', asyncHandler(taskController.getAll));

taskRouter.get(
  '/boards/:boardId/tasks/:taskId/',
  asyncHandler(taskController.getTask)
);

taskRouter.post(
  '/boards/:boardId/tasks/',
  asyncHandler(taskController.postTask)
);

taskRouter.put(
  '/boards/:boardId/tasks/:taskId/',
  asyncHandler(taskController.putTask)
);

taskRouter.delete(
  '/boards/:boardId/tasks/:taskId/',
  asyncHandler(taskController.deleteTask)
);

export default taskRouter;
