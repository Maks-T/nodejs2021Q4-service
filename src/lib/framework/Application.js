const http = require('http');
const EventEmitter = require('events');
const ParseRoute = require('./parse-route');
const ERROR_APP = require('./constants');

module.exports = class Application {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middlewares = [];
    this.endpoints = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  _createServer() {
    return http.createServer((req, res) => {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        req.body = body;

        this.middlewares.forEach((middleware) => {
          middleware(req, res);
        });

        this._parseUrl(req, res);

        if (!req.params) {
          req.emit('error', new Error('SOURSE NOT EXIST'));
        }

        const emitted = this.emitter.emit(
          Application._getRouteMask(req.pathname, req.method),
          req,
          res
        );

        if (!emitted) {
          res.end();
        }
      });

      req.on('error', (err) => {
        switch (err.message) {
          case ERROR_APP.BROKEN_BODY: {
            res.status(500).send(`Internal Server Error: ${err.message}`);
            break;
          }
          case ERROR_APP.SOURSE_NOT_EXIST: {
            res.status(400).send(`Error: ${err.message}`);
            break;
          }

          default: {
            res.status(500).send(`Internal Server Error: ${err.message}`);
          }
        }
      });
    });
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        this.endpoints.push({ path, method });
        const handler = endpoint[method];

        this.emitter.on(Application._getRouteMask(path, method), (req, res) => {
          handler(req, res);
        });
      });
    });
  }

  static _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }

  _parseUrl(req) {
    this.endpoints.forEach((endpoint) => {
      if (endpoint.method === req.method) {
        const parseRoute = new ParseRoute(endpoint.path);

        const params = parseRoute.match(req.url);

        if (params) {
          req.pathname = params.mask;
          req.params = params;
        }
      }
    });
  }
};
