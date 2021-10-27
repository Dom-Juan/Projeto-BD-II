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

// Controle de autenticação.
const sessionController = require('./src/controllers/sessionController');

// Autoriza um usuário a fazer algumas requisições.
const sessionMiddlware = require('./src/middleware/auth');

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
routes.get('/aluno/alunos' , alunoController.index);
routes.delete('/aluno/delete' , alunoController.deleteAluno); // Não pode estár acessível no front-end;

// Rotas do controlador de coordenadores.
routes.post('/coordenador/register', coordenadorController.insert);
routes.get('/coordenadores/' , coordenadorController.index);
routes.delete('/coordenador/delete' , coordenadorController.deleteCoordenador);

// Rotas do controlador de cursos.
routes.post('/curso/cadastrar', cursoController.insert);
routes.get('/curso/todos', cursoController.index);
//routes.get('/curso/id', cursoController.getById);
routes.get('/curso/nome', cursoController.getByCursoNome);
routes.delete('/curso/deletar' , cursoController.deleteCurso);

// Rotas do controlador de atividades.
routes.post('/atividade/enviar', upload.single('comprovante'), atividadeController.insert);
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