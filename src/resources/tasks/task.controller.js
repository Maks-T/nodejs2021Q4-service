const { StatusCodes } = require("http-status-codes");
const tasksService = require("./task.service");
const boardsService = require("../boards/board.service");

const Task = require("./task.model");
const { isIdValid } = require("../../lib/validation");

const _isBoardFound = async (req, res, handlerTask) => {
  if (!req.params) throw new Error("NOT PARAMS");

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

const getAll = async (req, res) => {
  _isBoardFound(req, res, async () => {
    const allTasks = await tasksService.getAll();

    res.status(StatusCodes.OK).send(allTasks);
  });
};

const getTask = async (req, res) => {
  try {
    _isBoardFound(req, res, async () => {
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

const createTask = async (req, res) => {
  try {
    _isBoardFound(req, res, async () => {
      const task = new Task(req.body);
      const taskData = task.data;

      taskData.boardId = req.params.boardId;
      const createdTask = await tasksService.createTask(taskData);

      res.status(StatusCodes.CREATED).send(createdTask);
    });
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: `Internal Server Error [postTask] ${e}` });
  }
};

const putTask = async (req, res) => {
  try {
    _isBoardFound(req, res, async () => {
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

const deleteTask = async (req, res) => {
  try {
    _isBoardFound(req, res, async () => {
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

module.exports = { getAll, getTask, createTask, putTask, deleteTask };
