// Geração de ids de atividade.
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('abc1234567890ebc', 7);

// Import de bibliotecas para serem usadas na rota.
const { Router } = require('express');
const multer  = require('multer');
const routes = Router();

// pegando a data atual.
let data = new Date();

// Criando o local aonde será adicionado os arquivos.
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null,  nanoid(7)+"_"+data.getFullYear()+"_"+(data.getMonth()+1)+"_"+data.getDate()+file.originalname);
  }
});
// cria a função de upload.
const upload = multer({ storage: storage });

// Controladores que pedem e usam modelos do banco de dados.
const usuarioController = require('./src/controllers/usuarioController');
const alunoController = require('./src/controllers/alunoController');
const coordenadorController = require('./src/controllers/coordController');
const atividadeController = require('./src/controllers/atividadeController');
const cursoController = require('./src/controllers/cursoController');
const entidadeAcadController = require('./src/controllers/entAcadController');
const horasController = require('./src/controllers/horasController');

// Controle de autenticação.
const sessionController = require('./src/controllers/sessionController');

// Autoriza um usuário a fazer algumas requisições.
const sessionMiddleWare = require('./src/middleware/auth');

// Rota de login.
routes.post('/session', sessionController.login);

// Rotas do controlador de usuário.
routes.post('/user/register', usuarioController.insert);
routes.post('/user/cadastro', usuarioController.insert_frontend);
routes.get('/user/users' , usuarioController.index);
routes.get('/user/email' , usuarioController.getByEmail);
routes.delete('/user/delete' , usuarioController.deleteUsuario);  // Não pode estár acessível no front-end;

// Rotas do controlador de alunos.
routes.post('/aluno/register', alunoController.insert);
routes.put('/aluno/editar', sessionMiddleWare.auth, alunoController.update);
routes.get('/aluno/alunos' , sessionMiddleWare.auth, alunoController.index);
routes.delete('/aluno/delete' , alunoController.deleteAluno); // Não pode estár acessível no front-end;

// Rotas do controlador de coordenadores.
routes.post('/coordenador/register', coordenadorController.insert);
routes.post('/coordenador/cadastro', coordenadorController.insert_frontend);
routes.put('/coordenador/editar', sessionMiddleWare.auth, coordenadorController.update);
routes.get('/coordenadores/' , coordenadorController.index);
routes.delete('/coordenador/delete' , coordenadorController.deleteCoordenador);

// Rotas do controlador de cursos.
routes.post('/curso/cadastrar', sessionMiddleWare.auth, cursoController.insert);
routes.put('/curso/editar', sessionMiddleWare.auth, cursoController.update);
routes.get('/curso/todos', sessionMiddleWare.auth, cursoController.index);
//routes.get('/curso/id', cursoController.getById);
routes.get('/curso/nome', sessionMiddleWare.auth, cursoController.getByCursoNome);
routes.delete('/curso/deletar' , sessionMiddleWare.auth, cursoController.deleteCurso);

// Rotas do controlador de atividades.
routes.post('/atividade/enviar', upload.single('comprovante'), sessionMiddleWare.auth, atividadeController.insert);
//routes.post('/atividade/editar', upload.single('comprovante'), sessionMiddleWare.auth, atividadeController.update);
routes.get('/atividade/todas', sessionMiddleWare.auth, atividadeController.index);
routes.get('/atividade/id', sessionMiddleWare.auth, atividadeController.getById);
routes.get('/atividade/curso', sessionMiddleWare.auth, atividadeController.getByCurso);
routes.delete('/atividade/deletar' , sessionMiddleWare.auth, atividadeController.deleteAtividade);

// Rotas do controlador de horas complementares.
routes.post('/horas/cadastrar', sessionMiddleWare.auth, horasController.insert);
routes.put('/horas/editar', sessionMiddleWare.auth, horasController.update);
routes.get('/horas/todas', sessionMiddleWare.auth, horasController.index);
routes.get('/horas/id', sessionMiddleWare.auth, horasController.getById);
routes.get('/horas/nome', sessionMiddleWare.auth, horasController.getByNome);
routes.get('/horas/curso', sessionMiddleWare.auth, horasController.getByCurso);
routes.delete('/horas/deletar' , sessionMiddleWare.auth, horasController.deleteHora);

// Rotas do controlador de entidade academias.
routes.post('/entidade/cadastrar', sessionMiddleWare.auth, entidadeAcadController.insert);
routes.get('/entidade/todas', sessionMiddleWare.auth, entidadeAcadController.index);
routes.get('/entidade/id', sessionMiddleWare.auth, entidadeAcadController.getById);
routes.get('/entidade/curso', sessionMiddleWare.auth, entidadeAcadController.getByCursoNome);
routes.delete('/entidade/deletar' , sessionMiddleWare.auth, entidadeAcadController.deleteEntidade);

module.exports = routes;