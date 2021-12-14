// Import de bibliotecas.
const express = require('express');
const routes = require('./routes');
const cors = require ('cors');

// Iniciando o servidor e a API como um todo.
class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
    this.error();
  }

  middleware() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  error() {
    this.server.use((err, req, res, next) => {
      res.locals.error = err;
      const status = err.status || 500;
      res.status(status);
      res.render('error');
      res.json({
        message: err.message,
        error: err
      });
    });
  }
}

module.exports = new App().server;