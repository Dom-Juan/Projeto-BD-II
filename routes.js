const { Router } = require('express');
const routes = Router();

const usuarioController = require('./src/controllers/usuarioController');
const alunoController = require('./src/controllers/alunoController');
const coordenadorController = require('./src/controllers/coordController');

//const sessionMiddlware = require('./middleware/auth');

// Rotas do controlador de usuário.
routes.post('/user/register', usuarioController.insert);
routes.get('/user/users' , usuarioController.index);
routes.delete('/user/delete' , usuarioController.deleteUsuario);  // Não pode estár acessível no front-end;

// Rotas do controlador de alunos.
routes.post('/aluno/register', alunoController.insert);
routes.get('/aluno/alunos' , alunoController.index);
routes.delete('/aluno/delete' , alunoController.deleteAluno);

// Rotas do controlador de coordenadores.
routes.post('/coordenador/register', coordenadorController.insert);
routes.get('/coordenadores/' , coordenadorController.index);
routes.delete('/coordenador/delete' , coordenadorController.deleteCoordenador);

module.exports = routes;