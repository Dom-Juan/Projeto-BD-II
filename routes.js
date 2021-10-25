// Import do router pra as rotas de requisição do server.
const { Router } = require('express');
const routes = Router();

// Controladores que pedem e usam modelos do banco de dados.
const usuarioController = require('./src/controllers/usuarioController');
const alunoController = require('./src/controllers/alunoController');
const coordenadorController = require('./src/controllers/coordController');
const atividadeController = require('./src/controllers/atividadeController');
const cursoController = require('./src/controllers/cursoController');
const entidadeAcadController = require('./src/controllers/entAcadController');

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
routes.delete('/aluno/delete' , alunoController.deleteAluno); // Não pode estár acessível no front-end;

// Rotas do controlador de coordenadores.
routes.post('/coordenador/register', coordenadorController.insert);
routes.get('/coordenadores/' , coordenadorController.index);
routes.delete('/coordenador/delete' , coordenadorController.deleteCoordenador);

// Rotas do controlador de cursos.
routes.post('/curso/cadastrar', cursoController.insert);
routes.get('/curso/all', cursoController.index);
routes.get('/curso/id', cursoController.getById);
routes.get('/curso/nome', cursoController.getByCursoNome);
routes.delete('/curso/deletar' , cursoController.deleteCurso);

// Rotas do controlador de atividades.
routes.post('/atividade/enviar', atividadeController.insert);
routes.get('/atividade/todas', atividadeController.index);
routes.get('/atividade/id', atividadeController.getById);
routes.get('/atividade/curso', atividadeController.getByCurso);
routes.delete('/atividade/deletar' , atividadeController.deleteAtividade);

// Rotas do controlador de entidade academias.
routes.post('/entidade/cadastrar', entidadeAcadController.insert);
routes.get('/entidade/todas', entidadeAcadController.index);
routes.get('/entidade/id', entidadeAcadController.getById);
routes.get('/entidade/curso', entidadeAcadController.getByCursoNome);
routes.delete('/entidade/deletar' , entidadeAcadController.deleteEntidade);

module.exports = routes;