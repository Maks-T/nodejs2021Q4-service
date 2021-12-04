const tasksController = require('./task.controller');

const Router = require('../../lib/framework/Router');

const router = new Router();

router.get('boards/:boardId/tasks/', tasksController.getAll);

router.get('boards/:boardId/tasks/:taskId/', tasksController.getTask);

router.post('boards/:boardId/tasks/', tasksController.createTask);

router.put('boards/:boardId/tasks/:taskId/', tasksController.putTask);

router.delete('boards/:boardId/tasks/:taskId/', tasksController.deleteTask);

module.exports = router;
