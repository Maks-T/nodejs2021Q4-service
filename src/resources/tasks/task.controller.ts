import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import tasksService from './task.service';
import boardsService from '../boards/board.service';
import isIdValid from '../../common/validaty';
import { ITaskData, Task } from './task.model';
import WarnLog from '../../common/warn-log';
import IntErrorWrap from '../../common/internal-error-wrapper';

/**
 * Accesses the repository to send all task data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @param handlerTask - callback function which calls if board is founded
 * @returns a promise object resolves to void
 */

/*const isBoardFound = async (req: Request): Promise<void> => {
  const { boardId } = req.params;

  if (!isIdValid(boardId)) {
    throw new WarnLog(
      StatusCodes.BAD_REQUEST,
      `Board id = ${boardId} is not valid`
    );
  } else {
    const foundBoard = await boardsService.getBoard(boardId);

    if (!foundBoard) {
      throw new WarnLog(
        StatusCodes.NOT_FOUND,
        `Board with id = ${boardId} was not found`
      );
    }
  }
};*/

const isBoardIdValid = (boardId: string) => {
  if (!isIdValid(boardId)) {
    throw new WarnLog(
      StatusCodes.BAD_REQUEST,
      `Board id = ${boardId} is not valid`
    );
  }
};

const isTaskIdValid = (taskId: string) => {
  if (!isIdValid(taskId)) {
    throw new WarnLog(
      StatusCodes.BAD_REQUEST,
      `Task id = ${taskId} is not valid`
    );
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
    const { boardId } = req.params;

    isBoardIdValid(boardId);

    const allTasks = await tasksService.getAll(boardId);

    if (!allTasks) {
      throw new WarnLog(
        StatusCodes.NOT_FOUND,
        `Board with id = ${boardId} was not found`
      );
    }

    res.status(StatusCodes.OK).send(allTasks);
  } catch (e) {
    IntErrorWrap(e, 'getAllTasks');
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
    const { boardId, taskId } = req.params;
    //ToDO check if board exist
    isBoardIdValid(boardId);

    isTaskIdValid(taskId);

    const foundTask = await tasksService.getTask(boardId, taskId);

    if (foundTask) {
      res.status(StatusCodes.OK).send(foundTask);
    } else {
      throw new WarnLog(
        StatusCodes.NOT_FOUND,
        `Task with id = ${taskId} was not found`
      );
    }
  } catch (e) {
    IntErrorWrap(e, 'getTask');
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
    const { boardId } = req.params;
    //ToDO check if board exist
    isBoardIdValid(boardId);

    const taskData = new Task(req.body);

    const createdTask = await tasksService.postTask(boardId, taskData);

    res.status(StatusCodes.CREATED).send(createdTask);
  } catch (e) {
    IntErrorWrap(e, 'postTask');
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
    const { boardId, taskId } = req.params;
    //ToDO check if board exist
    isBoardIdValid(boardId);

    isTaskIdValid(taskId);

    if (req.body.id) delete req.body.id;
    if (req.body.boardId) delete req.body.boardId;

    const updateTask = await tasksService.putTask(boardId, taskId, req.body);

    if (updateTask) {
      res.status(StatusCodes.OK).send(updateTask);
    } else {
      throw new WarnLog(
        StatusCodes.NOT_FOUND,
        `Task with id = ${taskId} was not found`
      );
    }
  } catch (e) {
    IntErrorWrap(e, 'putTask');
  }
};

/**
 * Accesses the repository to delete task data and unsubscribe from the task in all tasks
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { boardId, taskId } = req.params;
    //ToDO check if board exist
    isBoardIdValid(boardId);

    isTaskIdValid(taskId);

    const deletedTask = await tasksService.deleteTask(taskId);

    if (deletedTask) {
      res.status(StatusCodes.NO_CONTENT).send();
    } else {
      throw new WarnLog(
        StatusCodes.NOT_FOUND,
        `Task with id = ${taskId} was not found`
      );
    }
  } catch (e) {
    IntErrorWrap(e, 'deleteTask');
  }
};

export default { getAll, getTask, postTask, putTask, deleteTask };
