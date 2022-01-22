import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import authController from './auth.controller';

const authRouter: Router = Router();

authRouter.post('/', asyncHandler(authController.getToken));

export default authRouter;
