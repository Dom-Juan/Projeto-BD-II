'use strict';

const atividadeModel = require('../models/atividadeModel');
const coordModel = require('../models/coordModel');
const alunoModel = require('../models/alunoModel');

module.exports = {
  async insert(req, res, next) {
    //console.log(req.file, req.body);
    //console.log(req.body.ra_aluno_atividade);
    try {
      /*
      const atividade = await atividadeModel.getByNome(req.body.nome_atividade);
      
      if(atividade.length != 0) {
        return res.json({msg:"Esta atividade com este nome já existe!"});
      }
      */

      let aluno = await alunoModel.getByRa(req.body.ra_aluno_atividade);

      if(aluno.length === 0) {
        return res.json({msg: "Usuário não existe!"});
      } else {
        if(aluno[0].tipo_usuario_aluno !== "coordenador") {
          console.table("Aluno que tem esse RA:", aluno);
    
          let url_atividade = req.file.filename;
          let status_atividade = "pendente";

          const newAtividade = await atividadeModel.insert(req.body, aluno[0].id_aluno_usuario, url_atividade, status_atividade);
    
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

  async update(req, res, next) {
    try {
      console.log("Entrando em editar!");
      let aluno = await alunoModel.getByRa(req.body.ra_aluno_atividade);

      if(aluno.length === 0) {
        return res.json({msg: "Usuário não existe!"});
      } else {
        if(aluno[0].tipo_usuario_aluno !== "coordenador") {
          console.table("Aluno que tem esse RA:", aluno);
    
          let url_atividade = req.file.filename;
          let status_atividade = "pendente";

          const updatedAtividade = await atividadeModel.update(req.body, aluno[0].id_aluno_usuario, url_atividade, status_atividade);
    
          return res.json({updatedAtividade});
        } else {
          return res.status(500).json({msg: "Usuário é um coordenador."});
        }
      }
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: "internal server error"});
    }
  },

  async avaliar(req, res) {
    let coord = undefined;
    try{
      console.log("Corpo: ", req.body);
      const atividade = await atividadeModel.getByNome(req.body.nome_atividade);
      
      if(atividade.length == 0)
        return res.json({msg:"Esta atividade com este nome não existe!"});

      coord = await coordModel.getById(req.body.id_coord_usuario);

      if (coord.length == 0)
        return res.status(500).json({ msg: "Coordenador não existe." });

      let nome_responsavel = coord[0].nome_coord;
      let status_atividade = req.body.status_atividade;
      let id_atividade = atividade[0].id_atividade;
      const updatedAtividade = await atividadeModel.avaliar(id_atividade, status_atividade,  nome_responsavel);

      console.table(updatedAtividade);
  
      return res.json({updatedAtividade});

    } catch (error) {

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

  async index_id(req, res) {
    try {
      const response = await atividadeModel.getAllAlunoId(req.body.id_usuario);
      if(response) {
        return res.json({atividades: response});
      }
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