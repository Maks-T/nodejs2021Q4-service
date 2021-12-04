const boardsController = require('./board.controller');

const Router = require('../../lib/framework/Router');

const router = new Router();

router.get('/boards/', boardsController.getAll);

router.get('/boards/:boardId/', boardsController.getBoard);

router.post('/boards/', boardsController.createBoard);

router.put('/boards/:boardId/', boardsController.putBoard);

router.delete('/boards/:boardId/', boardsController.deleteBoard);

module.exports = router;
