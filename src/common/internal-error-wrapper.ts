import { StatusCodes } from 'http-status-codes';
import ErrorLog from './error-log';
import WarnLog from './warn-log';

const IntErrorWrap = (e: unknown, mes: string) => {
  if (e instanceof WarnLog) {
    throw e;
  } else {
    throw new ErrorLog(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Internal Server Error [${mes}] ${e}`
    );
  }
};

export default IntErrorWrap;
