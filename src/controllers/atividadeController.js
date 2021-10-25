'use strict';
const atividadeModel = require('../models/atividadeModel');
const alunoModel = require('../models/alunoModel');

module.exports = {
  async insert(req, res) {
    try {
      const atividade = await atividadeModel.getById(req.body.id_atividade);

      if(atividade.length != 0) {
        return res.json({msg:"Esta atividade com este ID já existe!"});
      }

      let aluno = await alunoModel.getByRa(req.body.ra_aluno_atividade);

      if(aluno.length === 0) {
        return res.json({msg: "Usuário não existe!"});
      } else {
        if(aluno[0].tipo_usuario_aluno !== "coordenador") {
          console.log("Aluno que tem esse RA:", aluno);
    
          const newAtividade = await atividadeModel.insert(req.body, aluno[0].id_aluno_usuario);
    
          return res.json({newAtividade});
        } else {
          return res.status(500).json({msg: "Usuário é um coordenador."});
        }
      }
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: "internal server error"});
    }
  },

  async index(req, res) {
    try {
      const response = await atividadeModel.getAll();
      if(response) return res.status(200).json({atividades: response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error.'});
    }
  },

  async getById(req, res) {
    try {
      const response = await atividadeModel.getById(req.body.id_atividade);
      if(response) return res.status(200).json({response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  },

  async getByCurso(req, res) {
    try {
      const response = await atividadeModel.getById(req.body.tipo_curso_atividade);
      if(response) return res.status(200).json({response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  },

  async deleteAtividade(req, res) {
    try {
      const response = await atividadeModel.delete(req.body.id_atividade, req.body.nome_atividade);
      console.log("Deletando atividade","[",req.body.id_atividade, ",", req.body.nome_atividade,"]",response);
      if(response.affectedRows != 0) return res.status(200).json({response});
      else return res.status(500).json({msg: 'Atividade já foi deletada ou é inexistente.'});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  }
};