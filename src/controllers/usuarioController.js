'use strict';
const usuarioModel = require('../models/usuarioModel');
const alunoModel = require('../models/coordModel');
const coordModel = require('../models/coordModel');

module.exports = {
  async insert(req, res) {
    try {
      //const aluno = await alunoModel.getByRa(req.body.ra_aluno);
      //const coord = await coordModel.getByName(req.body.nome_coord);
      let user = await usuarioModel.getByEmail(req.body.email_usuario);

      if(user.length != 0) {
        return res.json({msg:"Este usuário já existe!"});
      }

      user = await usuarioModel.getByUsername(req.body.nome_usuario);

      if(user.length != 0) {
        return res.json({msg:"Este usuário já existe!"});
      }

      const newUser = await usuarioModel.insert(req.body);

      console.log("Usuário a ser inserido:", newUser);

      return res.json({newUser});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: "internal server error"});
    }
  },

  async index(req, res) {
    try {
      const response = await usuarioModel.getAll();
      if(response) return res.status(200).json({usuários: response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error.'});
    }
  },

  async getById(req, res) {
    try {
      const response = await usuarioModel.getById(req.body.id_usuario);
      if(response) return res.status(200).json({response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  },

  async getByCurso(req, res) {
    try {
      const response = await usuarioModel.getById(req.body.curso);
      if(response) return res.status(200).json({response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  },

  async getByEmail(req, res) {
    try {
      const response = await usuarioModel.getById(req.body.usuario_email);
      if(response) return res.status(200).json({response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  },

  async deleteUsuario(req, res) {
    try {
      const response = await alunoModel.delete(req.body.nome_aluno, req.body.ra_aluno);
      console.log(response);
      if(response.affectedRows != 0) return res.status(200).json({response});
      else return res.status(500).json({msg: 'Aluno já foi deletado ou inexistente.'});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  }
};