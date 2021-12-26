import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import userController from './user.controller';

const userRouter: Router = Router();

userRouter.get('/users/', asyncHandler(userController.getAll));

userRouter.get('/users/:userId/', asyncHandler(userController.getUser));

userRouter.post('/users/', asyncHandler(userController.postUser));

userRouter.put('/users/:userId/', asyncHandler(userController.putUser));

userRouter.delete('/users/:userId/', asyncHandler(userController.deleteUser));

export default userRouter;
