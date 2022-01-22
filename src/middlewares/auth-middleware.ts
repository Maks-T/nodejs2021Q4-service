import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import { config } from '../common/config';
import WarnLog from '../common/warn-log';
import userService from '../resources/users/user.service';

interface JwtPayload {
  userId: string;
  login: string;
  token: string;
}

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const type = req.headers.authorization?.split(' ')[0];
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || type !== 'Bearer')
      next(
        new WarnLog(
          StatusCodes.UNAUTHORIZED,
          `No token or header authorization`
        )
      );
    else {
      const decodedData = <JwtPayload>jwt.verify(token, config.JWT_SECRET_KEY!);

      const user = await userService.getUser(decodedData.userId);

      if (user) next();
      else {
        next(
          new WarnLog(StatusCodes.UNAUTHORIZED, `Wrong token user not found`)
        );
      }
    }
  } catch (e) {
    next(new WarnLog(StatusCodes.UNAUTHORIZED, `Wrong token`));
  }
};
