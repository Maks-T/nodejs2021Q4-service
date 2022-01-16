import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import isIdValid from '../../common/validaty';
import { ITaskData } from '../tasks/task.model';
import taskService from '../tasks/task.service';
import { IUserData, User } from './user.model';
import userService from './user.service';

import IntErrorWrap from '../../common/internal-error-wrapper';
import WarnLog from '../../common/warn-log';

/**
 * Accesses the repository to send all user data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const allUsers = await userService.getAll();
    // map user fields to exclude secret fields like "password"
    allUsers.map((user) => user.toResponse());

    res.status(StatusCodes.OK).send(allUsers);
  } catch (e) {
    IntErrorWrap(e, 'getAllUsers');
  }
};

/**
 * Accesses the repository to send user data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    if (isIdValid(userId)) {
      const foundUser = await userService.getUser(userId);

      if (foundUser) {
        res.status(StatusCodes.OK).send(foundUser.toResponse());
      } else {
        throw new WarnLog(
          StatusCodes.NOT_FOUND,
          `User with id = ${userId} was not found`
        );
      }
    } else {
      throw new WarnLog(
        StatusCodes.BAD_REQUEST,
        `User id = ${userId} is not valid`
      );
    }
  } catch (e) {
    IntErrorWrap(e, 'getUser');
  }
};

/**
 * Accesses the repository to create and send user data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.body.id) delete req.body.id;

    const user = new User(req.body);

    const createdUser = await userService.postUser(user);

    res.status(StatusCodes.CREATED).send(createdUser.toResponse());
  } catch (e) {
    IntErrorWrap(e, 'postUser');
  }
};

/**
 * Accesses the repository to update and send user data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const putUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    if (isIdValid(userId)) {
      req.body.id = userId;

      const updateUser = await userService.putUser(userId, req.body);

      if (updateUser) {
        res.status(StatusCodes.OK).send(updateUser.toResponse());
      } else {
        throw new WarnLog(
          StatusCodes.NOT_FOUND,
          `User with id = ${userId} was not found`
        );
      }
    } else {
      throw new WarnLog(
        StatusCodes.BAD_REQUEST,
        `User id = ${userId} is not valid`
      );
    }
  } catch (e) {
    IntErrorWrap(e, 'putUser');
  }
};

/**
 * Accesses the repository to delete user data and unsubscribe from the user in all tasks
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    if (isIdValid(userId)) {
      const deletedUser = await userService.deleteUser(userId);

      if (deletedUser) {
        res.status(StatusCodes.NO_CONTENT).send();
      } else {
        throw new WarnLog(
          StatusCodes.NOT_FOUND,
          `User with id = ${userId} was not found`
        );
      }
    } else {
      throw new WarnLog(
        StatusCodes.BAD_REQUEST,
        `User id = ${userId} is not valid`
      );
    }
  } catch (e) {
    IntErrorWrap(e, 'deleteUser');
  }
};

export default { getAll, getUser, postUser, putUser, deleteUser };
