import express from 'express';
import { resolve } from 'path';
import * as Sentry from '@sentry/node';
import Youch from 'youch';
import 'express-async-errors';

import sentryConfig from './config/sentry';

import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    ); // express static to serve static files
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const errors = await new Youch(err, req).toJSON();
      return res.status(500).json(errors);
    });
  }
}

export default new App().server;
