const usersService = require('./user.service');
const User = require('./user.model');

const getAll = async (req, res) => {
  const allUsers = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  allUsers.map(User.toResponse);

  res.send(allUsers);
};

const getUser = async (req, res) => {
  if (req.params) {
    const findUser = await usersService.getUser(req);
  }
};

module.exports = { getAll, getUser };
