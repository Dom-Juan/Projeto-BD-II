// Import do router pra as rotas de requisição do server.
const { Router } = require('express');
const routes = Router();

// Controladores que pedem e usam modelos do banco de dados.
const usuarioController = require('./src/controllers/usuarioController');
const alunoController = require('./src/controllers/alunoController');
const coordenadorController = require('./src/controllers/coordController');
const atividadeController = require('./src/controllers/atividadeController');

// Autoriza um usuário a fazer algumas requisições.
const sessionMiddlware = require('./src/middleware/auth');

// Rotas do controlador de usuário.
routes.post('/user/register', usuarioController.insert);
routes.post('/user/cadastro', usuarioController.insert_frontend);
routes.get('/user/users' , usuarioController.index);
routes.get('/user/email' , usuarioController.getByEmail);
routes.delete('/user/delete' , usuarioController.deleteUsuario);  // Não pode estár acessível no front-end;

// Rotas do controlador de alunos.
routes.post('/aluno/register', alunoController.insert);
routes.get('/aluno/alunos' , alunoController.index);
routes.delete('/aluno/delete' , alunoController.deleteAluno);

// Rotas do controlador de coordenadores.
routes.post('/coordenador/register', coordenadorController.insert);
routes.get('/coordenadores/' , coordenadorController.index);
routes.delete('/coordenador/delete' , coordenadorController.deleteCoordenador);

// Rotas do controlador de atividades
routes.post('/atividade/enviar', atividadeController.insert);
routes.get('/atividade/todas', atividadeController.index);
routes.get('/atividade/id', atividadeController.getById);
routes.get('/atividade/curso', atividadeController.getByCurso);
routes.delete('/atividade/deletar' , atividadeController.deleteAtividade);

module.exports = routes;