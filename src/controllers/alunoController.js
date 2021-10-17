'use strict';
const usuarioModel = require('../models/usuarioModel');
const alunoModel = require('../models/alunoModel');

module.exports = {
  async insert(req, res) {
    try {
      const aluno = await alunoModel.getByRa(req.body.ra_aluno);

      if(aluno.length != 0) {
        return res.json({msg:"Este usuário com este RA já existe!"});
      }

      let usuario = await usuarioModel.getById(req.body.id_usuario);
      console.log("Aluno a ser inserido:", usuario);

      const newAluno = await alunoModel.insert(req.body, usuario[0].id_usuario);

      return res.json({newAluno});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: "internal server error"});
    }
  },

  async index(req, res) {
    try {
      const response = await alunoModel.getAll();
      if(response) return res.status(200).json({alunos: response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error.'});
    }
  },

  async getById(req, res) {
    try {
      const response = await alunoModel.getById(req.body.id_aluno);
      if(response) return res.status(200).json({response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  },

  async getByCurso(req, res) {
    try {
      const response = await alunoModel.getById(req.body.curso_aluno);
      if(response) return res.status(200).json({response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  },

  async deleteAluno(req, res) {
    try {
      const response = await alunoModel.delete(req.body.nome_aluno, req.body.ra_aluno);
      if(response) return res.status(200).json({response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  }
};