const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');
const User = require('./user.model');
const { isIdValid } = require('../../lib/validation');

const getAll = async (req, res) => {
  const allUsers = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  allUsers.map(User.toResponse);

  res.status(200).send(allUsers);
};

const getUser = async (req, res) => {
  try {
    if (!req.params) throw new Error('NOT PARAMS');
    const { userId } = req.params;
    if (isIdValid(userId)) {
      const foundUser = await usersService.getUser(userId);

      if (foundUser) {
        res.status(200).send(User.toResponse(foundUser));
      } else {
        res
          .status(404)
          .send({ message: `User with id = ${userId} was not found` });
      }
    } else {
      res.status(400).send({ message: `User id = ${userId} is not valid` });
    }
  } catch (e) {
    res.status(500).send({ message: `Internal Server Error [getUser]` });
  }
};

const createUser = async (req, res) => {
  try {
    if (req.body.id) delete req.body.id;

    const user = new User(req.body);

    const createdUser = await usersService.createUser(user.data);

    res.status(201).send(User.toResponse(createdUser));
  } catch (e) {
    res.status(500).send({ message: `Internal Server Error [postUser]` });
  }
};

const putUser = async (req, res) => {
  try {
    if (!req.params) throw new Error('NOT PARAMS');
    const { userId } = req.params;
    if (isIdValid(userId)) {
      req.body.id = userId;
      const updateUser = await usersService.putUser(userId, req.body);

      if (updateUser) {
        res.status(200).send(User.toResponse(updateUser));
      } else {
        res
          .status(404)
          .send({ message: `User with id = ${userId} was not found` });
      }
    } else {
      res.status(400).send({ message: `User id = ${userId} is not valid` });
    }
  } catch (e) {
    res.status(500).send({ message: `Internal Server Error [putUser] ${e}` });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!req.params) throw new Error('NOT PARAMS');
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

        res.status(204).send();
      } else {
        res
          .status(404)
          .send({ message: `User with id = ${userId} was not found` });
      }
    } else {
      res.status(400).send({ message: `User id = ${userId} is not valid` });
    }
  } catch (e) {
    res.status(500).send({ message: `Internal Server Error [deleteUser]` });
  }
};

module.exports = { getAll, getUser, createUser, putUser, deleteUser };
