const { StatusCodes } = require("http-status-codes");
const boardsService = require("./board.service");
const tasksService = require("../tasks/task.service");

const Board = require("./board.model");
const { isIdValid } = require("../../lib/validation");

const getAll = async (req, res) => {
  const allBoards = await boardsService.getAll();

  res.status(StatusCodes.OK).send(allBoards);
};

const getBoard = async (req, res) => {
  try {
    if (!req.params) throw new Error("NOT PARAMS");
    const { boardId } = req.params;
    if (isIdValid(boardId)) {
      const foundBoard = await boardsService.getBoard(boardId);

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
      .send({ message: `Internal Server Error [getBoard]` });
  }
};

const createBoard = async (req, res) => {
  try {
    const board = new Board(req.body);

    const createdBoard = await boardsService.createBoard(board.data);

    res.status(StatusCodes.CREATED).send(createdBoard);
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: `Internal Server Error [postBoard]` });
  }
};

const putBoard = async (req, res) => {
  try {
    if (!req.params) throw new Error("NOT PARAMS");
    const { boardId } = req.params;
    if (isIdValid(boardId)) {
      req.body.id = boardId;
      const updateBoard = await boardsService.putBoard(boardId, req.body);

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
      .send({ message: `Internal Server Error [putBoard] ${e}` });
  }
};

const deleteBoard = async (req, res) => {
  try {
    if (!req.params) throw new Error("NOT PARAMS");
    const { boardId } = req.params;
    if (isIdValid(boardId)) {
      const deletedBoard = await boardsService.deleteBoard(boardId);

      if (deletedBoard) {
        const allTasks = await tasksService.getAll();

        const deleteTasks = allTasks.filter((task) => task.boardId === boardId);

        deleteTasks.forEach((task) => {
          tasksService.deleteTask(task.id);
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

module.exports = { getAll, getBoard, createBoard, putBoard, deleteBoard };
