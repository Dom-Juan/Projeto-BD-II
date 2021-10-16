'use strict';
const usuarioModel = require('../models/usuarioModel');
const alunoModel = require('../models/coordModel');
const coordModel = require('../models/coordModel');

module.exports = {
  async insert(req, res) {
    try {
      const user = await usuarioModel.getById(req.body.id_usuario);
      //const aluno = await alunoModel.getByRa(req.body.ra_aluno);
      //const coord = await coordModel.getByName(req.body.nome_coord);

      if(user.length != 0) {
        return res.json({msg:"Este usuário já existe!"});
      }

      const newUser = await usuarioModel.insert(req.body);

      return res.json({newUser});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: "internal server error"});
    }
  },

  async index(req, res) {
    try {
      const response = await usuarioModel.getAll();
      if(response) return res.status(200).json({users: response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error.'});
    }
  },

  async getById() {
    try {
      const response = await usuarioModel.getById(req.userId);
      if(response) return res.status(200).json({response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  },

  async getByCurso() {
    try {
      const response = await usuarioModel.getById(req.userCurso);
      if(response) return res.status(200).json({response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  },

  async getByEmail() {
    try {
      const response = await usuarioModel.getById(req.userEmail);
      if(response) return res.status(200).json({response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  }
};