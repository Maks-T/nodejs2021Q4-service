import { StatusCodes } from 'http-status-codes';

import { Request, Response } from 'express';
import boardService from './board.service';
import isIdValid from '../../common/validaty';
import { Board, IBoardData } from './board.model';
import taskService from '../tasks/task.service';
import IntErrorWrap from '../../common/internal-error-wrapper';
import WarnLog from '../../common/warn-log';

/**
 * Accesses the repository to send all board data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const allBoards = await boardService.getAll();

    res.status(StatusCodes.OK).send(allBoards);
  } catch (e) {
    IntErrorWrap(e, 'getAllBoards');
  }
};

/**
 * Accesses the repository to send board data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const getBoard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { boardId } = req.params;
    if (isIdValid(boardId)) {
      const foundBoard = await boardService.getBoard(boardId);

      if (foundBoard) {
        res.status(StatusCodes.OK).send(foundBoard);
      } else {
        throw new WarnLog(
          StatusCodes.NOT_FOUND,
          `Board with id = ${boardId} was not found`
        );
      }
    } else {
      throw new WarnLog(
        StatusCodes.BAD_REQUEST,
        `Board id = ${boardId} is not valid`
      );
    }
  } catch (e) {
    IntErrorWrap(e, 'getBoard');
  }
};

/**
 * Accesses the repository to create and send board data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const postBoard = async (req: Request, res: Response): Promise<void> => {
  try {
    const board = new Board(req.body);

    const createdBoard = await boardService.postBoard(<IBoardData>board);

    res.status(StatusCodes.CREATED).send(createdBoard);
  } catch (e) {
    IntErrorWrap(e, 'postBoard');
  }
};

/**
 * Accesses the repository to update and send board data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const putBoard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { boardId } = req.params;

    if (isIdValid(boardId)) {
      req.body.id = boardId;

      const updateBoard = await boardService.putBoard(boardId, req.body);

      if (updateBoard) {
        res.status(StatusCodes.OK).send(updateBoard);
      } else {
        throw new WarnLog(
          StatusCodes.NOT_FOUND,
          `Board with id = ${boardId} was not found`
        );
      }
    } else {
      throw new WarnLog(
        StatusCodes.BAD_REQUEST,
        `Board id = ${boardId} is not valid`
      );
    }
  } catch (e) {
    IntErrorWrap(e, 'putBoard');
  }
};

/**
 * Accesses the repository to delete board data and unsubscribe from the task in all tasks
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const deleteBoard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { boardId } = req.params;
    if (isIdValid(boardId)) {
      const deletedBoard = await boardService.deleteBoard(boardId);

      if (deletedBoard) {
        /*const allTasks = await taskService.getAll();

        const deleteTasks = allTasks.filter((task) => task.boardId === boardId);

        deleteTasks.forEach((task) => {
          taskService.deleteTask(task.id);
        });*/

        res.status(StatusCodes.NO_CONTENT).send();
      } else {
        throw new WarnLog(
          StatusCodes.NOT_FOUND,
          `Board with id = ${boardId} was not found`
        );
      }
    } else {
      throw new WarnLog(
        StatusCodes.BAD_REQUEST,
        `Board id = ${boardId} is not valid`
      );
    }
  } catch (e) {
    IntErrorWrap(e, 'deleteBoard');
  }
};

export default { getAll, getBoard, postBoard, putBoard, deleteBoard };
