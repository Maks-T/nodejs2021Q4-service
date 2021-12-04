const { StatusCodes } = require("http-status-codes");
const usersService = require("./user.service");
const tasksService = require("../tasks/task.service");
const User = require("./user.model");
const { isIdValid } = require("../../lib/validation");

const getAll = async (req, res) => {
  const allUsers = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  allUsers.map(User.toResponse);

  res.status(StatusCodes.OK).send(allUsers);
};

const getUser = async (req, res) => {
  try {
    if (!req.params) throw new Error("NOT PARAMS");
    const { userId } = req.params;
    if (isIdValid(userId)) {
      const foundUser = await usersService.getUser(userId);

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

const createUser = async (req, res) => {
  try {
    if (req.body.id) delete req.body.id;

    const user = new User(req.body);

    const createdUser = await usersService.createUser(user.data);

    res.status(StatusCodes.CREATED).send(User.toResponse(createdUser));
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: `Internal Server Error [postUser]` });
  }
};

const putUser = async (req, res) => {
  try {
    if (!req.params) throw new Error("NOT PARAMS");
    const { userId } = req.params;
    if (isIdValid(userId)) {
      req.body.id = userId;
      const updateUser = await usersService.putUser(userId, req.body);

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

const deleteUser = async (req, res) => {
  try {
    if (!req.params) throw new Error("NOT PARAMS");
    const { userId } = req.params;
    if (isIdValid(userId)) {
      const deletedUser = await usersService.deleteUser(userId);

      if (deletedUser) {
        const allTasks = await tasksService.getAll();

        const updateTasks = allTasks.filter((task) => task.userId === userId);

        updateTasks.forEach((task) => {
          const updateTask = task;

          updateTask.userId = null;

          tasksService.putTask(updateTask);
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
      .send({ message: `Internal Server Error [deleteUser]` });
  }
};

module.exports = { getAll, getUser, createUser, putUser, deleteUser };
