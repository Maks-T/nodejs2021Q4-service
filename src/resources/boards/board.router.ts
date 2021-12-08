import { Router } from 'express';
import boardsController from './board.controller';

const boardRouter: Router = Router();

boardRouter.get('/boards/', boardsController.getAll);

boardRouter.get('/boards/:boardId/', boardsController.getBoard);

boardRouter.post('/boards/', boardsController.postBoard);

boardRouter.put('/boards/:boardId/', boardsController.putBoard);

boardRouter.delete('/boards/:boardId/', boardsController.deleteBoard);

export default boardRouter;
