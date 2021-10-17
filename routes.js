const { Router } = require('express');
const routes = Router();

const usuarioController = require('./src/controllers/usuarioController');
const alunoController = require('./src/controllers/alunoController');

// Rotas do controlador de usuário.
routes.post('/user/register', usuarioController.insert);
routes.get('/user/users' , usuarioController.index);

// Rotas do controlador de alunos.
routes.post('/aluno/register', alunoController.insert);
routes.get('/aluno/alunos' , alunoController.index);
routes.delete('/aluno/delete' , alunoController.deleteAluno);

//const sessionMiddlware = require('./middleware/auth');

module.exports = routes;