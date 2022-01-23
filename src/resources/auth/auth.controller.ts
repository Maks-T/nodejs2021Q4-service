import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import IntErrorWrap from '../../common/internal-error-wrapper';
import WarnLog from '../../common/warn-log';
import { IAuth } from './auth.model';
import authService from './auth.service';

const getToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const authData: IAuth = req.body;

    const token = await authService.getToken(authData);

    if (token) {
      res.status(StatusCodes.OK).send(token);
    } else {
      throw new WarnLog(StatusCodes.FORBIDDEN, `Invalid login or password`);
    }
  } catch (e) {
    IntErrorWrap(e, 'getToken');
  }
};

export default { getToken };
