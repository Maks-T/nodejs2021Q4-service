//const router = require('express').Router();
const User = require('./user.model');

const usersController = require('./user.controller');

const Router = require('../../lib/framework/Router');

const router = new Router();

router.get('/users/', usersController.getAll);

router.get('/users/:userId/', usersController.getUser);

router.post('/users/', usersController.createUser);

module.exports = router;
