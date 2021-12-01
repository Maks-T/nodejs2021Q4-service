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

        this._parseUrl(req);

        const emitted = this.emitter.emit(
          this._getRouteMask(req.pathname, req.method),
          req,
          res
        );

        if (!emitted) {
          res.end();
        }
      });
    });
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      this.endpoints.push(path);
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
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
    this.endpoints.forEach((mask) => {
      const parseRoute = new ParseRoute(mask);

      const params = parseRoute.match(req.url);

      console.log('endpoints: ', req.url, 'match - ', params);
      if (params) {
        console.log('req.url', req.url);
        req.pathname = params.mask;
        req.params = params;
      }
    });
  }
};
