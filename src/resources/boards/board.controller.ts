import { StatusCodes } from 'http-status-codes';

import { Request, Response } from 'express';
import boardService from './board.service';
import isIdValid from '../../common/validaty';
import { Board, IBoardData } from './board.model';
import taskService from '../tasks/task.service';

/**
 * Accesses the repository to send all task data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const allBoards = await boardService.getAll();

    res.status(StatusCodes.OK).send(allBoards);
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: `Internal Server Error [getAllBoards] ${e}` });
  }
};

/**
 * Accesses the repository to send task data without password to client
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
        res
          .status(StatusCodes.NOT_FOUND)
          .send({ message: `Board with id = ${boardId} was not found` });
      }
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: `Board id = ${boardId} is not valid` });
    }
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: `Internal Server Error [getBoard] ${e}` });
  }
};

/**
 * Accesses the repository to create and send task data without password to client
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
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: `Internal Server Error [postBoard] ${e}` });
  }
};

/**
 * Accesses the repository to update and send task data without password to client
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
        res
          .status(StatusCodes.NOT_FOUND)
          .send({ message: `Board with id = ${boardId} was not found` });
      }
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: `Board id = ${boardId} is not valid` });
    }
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: `Internal Server Error [putBoard] ${e} ${e}` });
  }
};

/**
 * Accesses the repository to delete task data and unsubscribe from the task in all tasks
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
        const allTasks = await taskService.getAll();

        const deleteTasks = allTasks.filter((task) => task.boardId === boardId);

        deleteTasks.forEach((task) => {
          taskService.deleteTask(task.id);
        });

        res.status(StatusCodes.NO_CONTENT).send();
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .send({ message: `Board with id = ${boardId} was not found` });
      }
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: `Board id = ${boardId} is not valid` });
    }
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: `Internal Server Error [deleteBoard]` });
  }
};

export default { getAll, getBoard, postBoard, putBoard, deleteBoard };
