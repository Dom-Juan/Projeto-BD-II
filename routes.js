const { Router } = require('express');
const routes = Router();

const usuarioController = require('./src/controllers/usuarioController');

// Rotas do controlador de usuário.
routes.post('/user/register', usuarioController.insert);
routes.get('/user/users' , usuarioController.index);

const sessionMiddlware = require('./middleware/auth');

module.exports = routes;