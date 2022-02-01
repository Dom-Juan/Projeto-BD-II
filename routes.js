// Import de bibliotecas para serem usadas na rota.
const { Router } = require('express');
const routes = Router();

// cria a função de upload.
const upload = require("./src/middleware/fileUpload");

// Controladores que pedem e usam modelos do banco de dados.
const usuarioController = require('./src/controllers/usuarioController');
const alunoController = require('./src/controllers/alunoController');
const coordenadorController = require('./src/controllers/coordController');
const atividadeController = require('./src/controllers/atividadeController');
const cursoController = require('./src/controllers/cursoController');
const auxCursoController = require('./src/controllers/auxCursoController');
const entidadeAcadController = require('./src/controllers/entAcadController');
const horasController = require('./src/controllers/horasController');
const fileController = require("./src/controllers/fileUploadController");

// Controle de autenticação.
const sessionController = require('./src/controllers/sessionController');

// Autoriza um usuário a fazer algumas requisições.
const sessionMiddleWare = require('./src/middleware/auth');

// Rota de login.
routes.post('/session', sessionController.login);

// Rotas do controlador de usuário.
routes.post('/user/register', usuarioController.insert);
routes.post('/user/cadastro', usuarioController.insert_frontend);
routes.put('/user/editar', sessionMiddleWare.auth, usuarioController.update);
routes.put('/user/trocar/senha', sessionMiddleWare.auth, usuarioController.update_password);
routes.put('/user/trocar/email', sessionMiddleWare.auth, usuarioController.update_email_and_psw);
routes.get('/user/id', sessionMiddleWare.auth, usuarioController.getByIdFront);
routes.get('/user/users' , usuarioController.index);
routes.get('/user/email' , usuarioController.getByEmail);
routes.delete('/user/delete' , usuarioController.deleteUsuario);  // Não pode estár acessível no front-end;

// Rotas do controlador de alunos.
routes.post('/aluno/register', alunoController.insert);
routes.put('/aluno/editar', sessionMiddleWare.auth, alunoController.update);
//routes.put('/aluno/trocar/nome', sessionMiddleWare.auth, alunoController.update_name);
routes.get('/aluno/id', sessionMiddleWare.auth, alunoController.getByIdFront);
routes.get('/aluno/alunos' , sessionMiddleWare.auth, alunoController.index);
routes.delete('/aluno/delete' , alunoController.deleteAluno); // Não pode estár acessível no front-end;

// Rotas do controlador de coordenadores.
routes.post('/coordenador/register', coordenadorController.insert);
routes.post('/coordenador/cadastro', coordenadorController.insert_frontend);
routes.put('/coordenador/editar', sessionMiddleWare.auth, coordenadorController.update);
//routes.put('/coordenador/trocar/nome', sessionMiddleWare.auth, coordenadorController.update_name);
routes.get('/coordenador/id', sessionMiddleWare.auth, coordenadorController.getByIdFront);
routes.get('/coordenadores/' , coordenadorController.index);
routes.delete('/coordenador/delete' , coordenadorController.deleteCoordenador);

// Rotas do controlador de cursos.
routes.post('/curso/cadastrar', cursoController.insert);
routes.put('/curso/editar', sessionMiddleWare.auth, cursoController.update);
routes.get('/curso/todos', cursoController.index);
//routes.get('/curso/id', cursoController.getById);
routes.get('/curso/nome', sessionMiddleWare.auth, cursoController.getByCursoNome);
routes.delete('/curso/deletar' , sessionMiddleWare.auth, cursoController.deleteCurso);

// Rotas do controlador de aux cursos.
routes.post('/aux-curso/cadastrar', auxCursoController.insert);
routes.put('/aux-curso/editar', sessionMiddleWare.auth, auxCursoController.update);
routes.get('/aux-curso/todos', auxCursoController.index);
routes.get('/aux-curso/id', auxCursoController.getById);
routes.delete('/aux-curso/deletar' , sessionMiddleWare.auth, auxCursoController.deleteCurso);

// Rotas do controlador de atividades.
routes.post('/atividade/enviar', upload, sessionMiddleWare.auth, atividadeController.insert);
routes.put('/atividade/avaliar/', sessionMiddleWare.auth, atividadeController.avaliar);
routes.get("/atividade/download/:name", fileController.downloadFiles);
routes.get("/atividade/download/front/:name", fileController.downloadFileFront);
routes.get("/atividade/get-file/:name", fileController.getFile);
//routes.post('/atividade/editar', upload.single('comprovante'), sessionMiddleWare.auth, atividadeController.update);

routes.get("/files", fileController.getFilesList);

routes.get('/atividade/todas', sessionMiddleWare.auth, atividadeController.index);
routes.get('/atividade/todas/id', sessionMiddleWare.auth, atividadeController.index_id);
routes.get('/atividade/id', sessionMiddleWare.auth, atividadeController.getById);
routes.get('/atividade/curso', sessionMiddleWare.auth, atividadeController.getByCurso);
routes.delete('/atividade/deletar' , sessionMiddleWare.auth, atividadeController.deleteAtividade);

// Rotas do controlador de horas complementares.
routes.post('/horas/cadastrar', horasController.insert);
routes.put('/horas/editar', sessionMiddleWare.auth, horasController.update);
routes.get('/horas/todas', sessionMiddleWare.auth, horasController.index);
routes.get('/horas/id', sessionMiddleWare.auth, horasController.getById);
routes.get('/horas/nome', sessionMiddleWare.auth, horasController.getByNome);
routes.get('/horas/curso', sessionMiddleWare.auth, horasController.getByCurso);
routes.delete('/horas/deletar' , sessionMiddleWare.auth, horasController.deleteHora);

// Rotas do controlador de entidade academias.
routes.post('/entidade/cadastrar', entidadeAcadController.insert);
routes.put('/entidade/editar', sessionMiddleWare.auth, entidadeAcadController.update);
routes.get('/entidade/todas', entidadeAcadController.index);
routes.get('/entidade/id', sessionMiddleWare.auth, entidadeAcadController.getById);
routes.get('/entidade/curso', sessionMiddleWare.auth, entidadeAcadController.getByCursoNome);
routes.delete('/entidade/deletar' , sessionMiddleWare.auth, entidadeAcadController.deleteEntidade);

module.exports = routes;