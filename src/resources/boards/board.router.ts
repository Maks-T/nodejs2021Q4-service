import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import boardsController from './board.controller';

const boardRouter: Router = Router();

boardRouter.get('/boards/', asyncHandler(boardsController.getAll));

boardRouter.get('/boards/:boardId/', asyncHandler(boardsController.getBoard));

boardRouter.post('/boards/', asyncHandler(boardsController.postBoard));

boardRouter.put('/boards/:boardId/', asyncHandler(boardsController.putBoard));

boardRouter.delete(
  '/boards/:boardId/',
  asyncHandler(boardsController.deleteBoard)
);

export default boardRouter;
