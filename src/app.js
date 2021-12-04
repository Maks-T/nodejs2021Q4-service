const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const Application = require('./lib/framework/Application');
const parseJSON = require('./lib/framework/middlewares/parseJSON');
const bodyParserJSON = require('./lib/framework/middlewares/bodyParserJSON');
const status = require('./lib/framework/middlewares/status');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = new Application();

app.use(status); // first
app.use(parseJSON);
app.use(bodyParserJSON);

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const handlerSwagger = (swaggerUI.serve, swaggerUI.setup(swaggerDocument));

userRouter.get('/doc', handlerSwagger);
boardRouter.get('/doc', handlerSwagger);
taskRouter.get('/doc', handlerSwagger);

app.addRouter(userRouter);
app.addRouter(boardRouter);
app.addRouter(taskRouter);

module.exports = app;
