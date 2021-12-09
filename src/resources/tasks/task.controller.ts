import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import tasksService from './task.service';
import boardsService from '../boards/board.service';
import isIdValid from '../../common/validaty';
import { ITaskData, Task } from './task.model';

/**
 * Description
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @param handlerTask - callback function which calls if board is founded
 * @returns a promise object resolves to void
 */
const isBoardFound = async (
  req: Request,
  res: Response,
  handlerTask: () => void
): Promise<void> => {
  const { boardId } = req.params;

  if (!isIdValid(boardId)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: `Board id = ${boardId} is not valid` });
  } else {
    const foundBoard = await boardsService.getBoard(boardId);

    if (foundBoard) {
      handlerTask();
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: `Board with id = ${boardId} was not found` });
    }
  }
};

/**
 * Accesses the repository to send all task data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    isBoardFound(req, res, async () => {
      const allTasks = await tasksService.getAll();

      res.status(StatusCodes.OK).send(allTasks);
    });
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: `Internal Server Error [getAllTasks] ${e}` });
  }
};

/**
 * Accesses the repository to send task data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const getTask = async (req: Request, res: Response): Promise<void> => {
  try {
    isBoardFound(req, res, async () => {
      const { taskId } = req.params;

      if (isIdValid(taskId)) {
        const foundTask = await tasksService.getTask(taskId);

        if (foundTask) {
          res.status(StatusCodes.OK).send(foundTask);
        } else {
          res
            .status(StatusCodes.NOT_FOUND)
            .send({ message: `Task with id = ${taskId} was not found` });
        }
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: `Task id = ${taskId} is not valid` });
      }
    });
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: `Internal Server Error [getTask] ${e}` });
  }
};

/**
 * Accesses the repository to create and send task data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const postTask = async (req: Request, res: Response) => {
  try {
    isBoardFound(req, res, async () => {
      const task = new Task(req.body);

      const taskData = <ITaskData>task;

      taskData.boardId = req.params.boardId;
      const createdTask = await tasksService.postTask(taskData);

      res.status(StatusCodes.CREATED).send(createdTask);
    });
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: `Internal Server Error [postTask] ${e}` });
  }
};

/**
 * Accesses the repository to update and send task data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const putTask = async (req: Request, res: Response) => {
  try {
    isBoardFound(req, res, async () => {
      const { taskId } = req.params;

      if (isIdValid(taskId)) {
        req.body.id = taskId;

        const updateTask = await tasksService.putTask(taskId, req.body);

        if (updateTask) {
          res.status(StatusCodes.OK).send(updateTask);
        } else {
          res
            .status(StatusCodes.NOT_FOUND)
            .send({ message: `Task with id = ${taskId} was not found` });
        }
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: `Task id = ${taskId} is not valid` });
      }
    });
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: `Internal Server Error [putTask] ${e}` });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    isBoardFound(req, res, async () => {
      const { taskId } = req.params;

      if (isIdValid(taskId)) {
        const deletedTask = await tasksService.deleteTask(taskId);

        if (deletedTask) {
          res.status(StatusCodes.NO_CONTENT).send();
        } else {
          res
            .status(StatusCodes.NOT_FOUND)
            .send({ message: `Task with id = ${taskId} was not found` });
        }
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: `Task id = ${taskId} is not valid` });
      }
    });
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: `Internal Server Error [deleteTask] ${e}` });
  }
};

export default { getAll, getTask, postTask, putTask, deleteTask };
