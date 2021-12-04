const boardsService = require('./board.service');
const tasksService = require("../tasks/task.service");

const Board = require('./board.model');
const { isIdValid } = require('../../lib/validation');

const getAll = async (req, res) => {
  const allBoards = await boardsService.getAll();

  res.status(200).send(allBoards);
};

const getBoard = async (req, res) => {
  try {
    if (!req.params) throw new Error('NOT PARAMS');
    const { boardId } = req.params;
    if (isIdValid(boardId)) {
      const foundBoard = await boardsService.getBoard(boardId);

      if (foundBoard) {
        res.status(200).send(foundBoard);
      } else {
        res
          .status(404)
          .send({ message: `Board with id = ${boardId} was not found` });
      }
    } else {
      res.status(400).send({ message: `Board id = ${boardId} is not valid` });
    }
  } catch (e) {
    res.status(500).send({ message: `Internal Server Error [getBoard]` });
  }
};

const createBoard = async (req, res) => {
  try {
    const board = new Board(req.body);

    const createdBoard = await boardsService.createBoard(board.data);

    res.status(201).send(createdBoard);
  } catch (e) {
    res.status(500).send({ message: `Internal Server Error [postBoard]` });
  }
};

const putBoard = async (req, res) => {
  try {
    if (!req.params) throw new Error('NOT PARAMS');
    const { boardId } = req.params;
    if (isIdValid(boardId)) {
      req.body.id = boardId;
      const updateBoard = await boardsService.putBoard(boardId, req.body);

      if (updateBoard) {
        res.status(200).send(updateBoard);
      } else {
        res
          .status(404)
          .send({ message: `Board with id = ${boardId} was not found` });
      }
    } else {
      res.status(400).send({ message: `Board id = ${boardId} is not valid` });
    }
  } catch (e) {
    res.status(500).send({ message: `Internal Server Error [putBoard] ${e}` });
  }
};

const deleteBoard = async (req, res) => {
  try {
    if (!req.params) throw new Error('NOT PARAMS');
    const { boardId } = req.params;
    if (isIdValid(boardId)) {
      const deletedBoard = await boardsService.deleteBoard(boardId);

      if (deletedBoard) {
        const allTasks = await tasksService.getAll();

        const deleteTasks = allTasks.filter((task) => task.boardId === boardId);

        deleteTasks.forEach((task) => {
          tasksService.deleteTask(task.id);
        });

        res.status(204).send();
      } else {
        res
          .status(404)
          .send({ message: `Board with id = ${boardId} was not found` });
      }
    } else {
      res.status(400).send({ message: `Board id = ${boardId} is not valid` });
    }
  } catch (e) {
    res.status(500).send({ message: `Internal Server Error [deleteBoard]` });
  }
};

module.exports = { getAll, getBoard, createBoard, putBoard, deleteBoard };
