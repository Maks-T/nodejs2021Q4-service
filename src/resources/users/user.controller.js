const usersService = require('./user.service');
const User = require('./user.model');
const { isIdValid } = require('../../lib/validation');

const getAll = async (req, res) => {
  const allUsers = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  allUsers.map(User.toResponse);

  res.status(200).send(allUsers);
};

const getUser = async (req, res) => {
  if (req.params) {
    const userId = req.params.userId;
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
  } else {
    res.status(500).send({ message: `Internal Server Error [getUser]` });
  }
};

const createUser = async (req, res) => {
  const user = new User(req.body);
  const createdUser = await usersService.createUser(user);
  console.log('createdUser', createdUser);
  res.status(201).send(User.toResponse(createdUser));
};

module.exports = { getAll, getUser, createUser };
