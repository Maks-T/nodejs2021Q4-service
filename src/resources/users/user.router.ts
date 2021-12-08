import { Router } from 'express';
import userController from './user.controller';

const userRouter: Router = Router();

userRouter.get('/users/', userController.getAll);

userRouter.get('/users/:userId/', userController.getUser);

userRouter.post('/users/', userController.postUser);

userRouter.put('/users/:userId/', userController.putUser);

userRouter.delete('/users/:userId/', userController.deleteUser);

export default userRouter;
