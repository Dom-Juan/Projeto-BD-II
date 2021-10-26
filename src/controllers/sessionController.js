const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const usuarioModel = require('../models/usuarioModel');
const alunoModel = require('../models/alunoModel');
const coordModel = require('../models/coordModel');

class SessionController {
  async login(req, res) {

    let user;
    let acesso;
    console.log(req.body);
    if (req.body.nivel === 'aluno') {
      user = await usuarioModel.getByEmail(req.body.email);
      acesso = await alunoModel.getById(user[0].id_usuario);
    } else if (req.body.nivel === 'coordenador') {
      user = await usuarioModel.getByEmail(req.body.email);
      acesso = await coordModel.getById(user[0].id_usuario);
    }
    console.table(acesso);

    if (user.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (user[0].senha !== req.body.senha) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    if (req.body.nivel === 'aluno') {
      console.log('Aluno acessando: ', acesso[0]);
      const result = {
        ra_aluno: acesso[0].ra_aluno,
        nome: acesso[0].nome_aluno,
        email: user[0].email_usuario,
        nivel: user[0].tipo_usuario,
      }

      let ra_aluno = result.ra_aluno;
      let nivel = result.nivel;
      return res.json({
        user: result,
        token: jwt.sign({ ra_aluno, nivel }, authConfig.secret, {
          expiresIn: authConfig.expiresIn
        })
      })
    } else {
      console.log('Coordenador acessando: ', acesso[0]);
      const result = {
        nome: acesso[0].nome_aluno,
        email: user[0].email_usuario,
        nivel: user[0].tipo_usuario,
      }

      let nome_coord = result.nome;
      let nivel = result.nivel

      return res.json({
        user: result,
        token: jwt.sign({ nome_coord, nivel }, authConfig.secret, {
          expiresIn: authConfig.expiresIn
        })
      })
    }
  }
}

module.exports = new SessionController();