const { PORT } = require('./common/config');
//const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');

const Application = require('./lib/framework/Application');
const parseJSON = require('./lib/framework/middlewares/parseJSON');
const parseUrl = require('./lib/framework/middlewares/parseUrl');
const bodyParserJSON = require('./lib/framework/middlewares/bodyParserJSON');

const app = new Application();

app.use(parseJSON);
app.use(bodyParserJSON);
//app.use(parseUrl("http://127.0.0.1:4000"));

app.addRouter(userRouter);

/*

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
*/

module.exports = app;
