import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import isIdValid from '../../common/validaty';
import { ITaskData } from '../tasks/task.model';
import taskService from '../tasks/task.service';
import { IUserData, User } from './user.model';
import userService from './user.service';

/**
 * Accesses the repository to send all user data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to null
 */
const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const allUsers = await userService.getAll();
    // map user fields to exclude secret fields like "password"
    allUsers.map(User.toResponse);

    res.status(StatusCodes.OK).send(allUsers);
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: `Internal Server Error [getAllUsers] ${e}` });
  }
};

/**
 * Accesses the repository to send user data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to null
 */
const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    if (isIdValid(userId)) {
      const foundUser = await userService.getUser(userId);

      if (foundUser) {
        res.status(StatusCodes.OK).send(User.toResponse(foundUser));
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .send({ message: `User with id = ${userId} was not found` });
      }
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: `User id = ${userId} is not valid` });
    }
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: `Internal Server Error [getUser]` });
  }
};

/**
 * Accesses the repository to create and send user data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to null
 */
const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.body.id) delete req.body.id;

    const user = new User(req.body);

    const createdUser = await userService.postUser(<IUserData>user);

    res.status(StatusCodes.CREATED).send(User.toResponse(createdUser));
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: `Internal Server Error [postUser] ${e}` });
  }
};

/**
 * Accesses the repository to update and send user data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to null
 */
const putUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    if (isIdValid(userId)) {
      req.body.id = userId;

      const updateUser = await userService.putUser(userId, req.body);

      if (updateUser) {
        res.status(StatusCodes.OK).send(User.toResponse(updateUser));
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .send({ message: `User with id = ${userId} was not found` });
      }
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: `User id = ${userId} is not valid` });
    }
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: `Internal Server Error [putUser] ${e}` });
  }
};

/**
 * Accesses the repository to delete user data and unsubscribe from the user in all tasks
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to null
 */
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    if (isIdValid(userId)) {
      const deletedUser = await userService.deleteUser(userId);

      if (deletedUser) {
        const allTasks = await taskService.getAll();

        const updateTasks = allTasks.filter((task) => task.userId === userId);

        updateTasks.forEach((task) => {
          const updateTask: ITaskData = task;

          updateTask.userId = null;

          taskService.putTask(updateTask.id, updateTask);
        });

        res.status(StatusCodes.NO_CONTENT).send();
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .send({ message: `User with id = ${userId} was not found` });
      }
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: `User id = ${userId} is not valid` });
    }
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: `Internal Server Error [deleteUser] ${e}` });
  }
};

export default { getAll, getUser, postUser, putUser, deleteUser };
