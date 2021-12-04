const usersController = require('./user.controller');

const Router = require('../../lib/framework/Router');

const router = new Router();

router.get('/users/', usersController.getAll);

router.get('/users/:userId/', usersController.getUser);

router.post('/users/', usersController.createUser);

router.put('/users/:userId/', usersController.putUser);

router.delete('/users/:userId/', usersController.deleteUser);

module.exports = router;
