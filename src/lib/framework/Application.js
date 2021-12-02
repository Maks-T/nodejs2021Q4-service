const http = require('http');
const EventEmitter = require('events');
const ParseRoute = require('./../parse-route');

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

        console.log(req.body);

        this._parseUrl(req, res);

        if (!req.params) {
          req.emit('error', new Error('SOURSE NOT EXIST'));
        }

        const emitted = this.emitter.emit(
          this._getRouteMask(req.pathname, req.method),
          req,
          res
        );

        if (!emitted) {
          res.end();
        }
      });

      req.on('error', (err) => {
        switch (err.message) {
          case 'BROKEN BODY': {
            //TODO CONSTANTS
            res.status(500).send(`Internal Server Error: ${err.message}`);
            break;
          }
          case 'SOURSE NOT EXIST': {
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

        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          handler(req, res);
        });
      });
    });
  }

  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }

  _parseUrl(req) {
    console.log('endpoints APP: ', this.endpoints);
    this.endpoints.forEach((endpoint) => {
      if (endpoint.method === req.method) {
        const parseRoute = new ParseRoute(endpoint.path);

        const params = parseRoute.match(req.url);

        console.log('endpoint: ', endpoint, 'match - ', params);
        if (params) {
          console.log('req.url', req.url);
          req.pathname = params.mask;
          req.params = params;
        }
      }
    });
  }
};
