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

      if(usuario.length === 0) {
        return res.json({msg: "Usuário não existe!"});
      } else {
        if(usuario[0].tipo_usuario !== "coordenador") {
          console.table(usuario);
    
          const newAluno = await alunoModel.insert(req.body, usuario[0].id_usuario);
    
          return res.json({newAluno});
        } else {
          return res.status(500).json({msg: "Usuário é um coordenador."});
        }
      }
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: "internal server error"});
    }
  },

  async update(req, res) {
    try {
      const aluno = await alunoModel.getById(req.body.id_usuario);

      if(aluno[0] == undefined ||aluno[0].ra_aluno == undefined) {
        return res.json({msg:"Este usuário com este RA não existe!"});
      }

      let usuario = await usuarioModel.getById(req.body.id_usuario);

      if(usuario.length === 0 && (aluno[0].ra_aluno === req.body.ra_aluno)) {
        return res.json({msg: "Usuário não existe!"});
      } else {
        if(usuario[0].tipo_usuario !== "coordenador") {
          console.table(usuario);
          let obj = {
            ra_aluno: req.body.ra_aluno,
            nome_aluno: req.body.nome_aluno,
            nome_ent_acad_aluno: req.body.nome_ent_acad_aluno,
            ano_nascimento_aluno: req.body.ano_nascimento_aluno, 
            tipo_usuario_aluno: aluno[0].tipo_usuario_aluno,
            tipo_grad_aluno: aluno[0].tipo_grad_aluno 
          }
          const updatedAluno = await alunoModel.update(obj, usuario[0].id_usuario, req.body.nome_responsavel);
          console.log("Coordenador a ser atualizado:", updatedAluno);
          return res.json({updatedAluno});
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
      const response = await alunoModel.getAll();
      if(response) return res.status(200).json({alunos: response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error.'});
    }
  },

  async getById(req, res) {
    try {
      const response = await alunoModel.getById(req.body.id_aluno_usuario);
      if(response) return res.status(200).json({response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  },

  async getByIdFront(req, res) {
    try {
      const getId = await alunoModel.getById(req.query.id_aluno_usuario);
      let obj = {
        id_aluno_usuario: getId[0].id_aluno_usuario,
        ra_aluno: getId[0].ra_aluno,
        nome_aluno: getId[0].nome_aluno,
        nome_ent_acad_aluno: getId[0].nome_ent_acad_aluno,
        ano_nascimento_aluno: getId[0].ano_nascimento_aluno,
      }
      console.log("Acessando aluno: \n", obj);
      if(obj) return res.status(200).json(obj);
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
      let usuario = await usuarioModel.getById(req.body.id_usuario);
      
      if(usuario.length === 0) {
        return res.status(500).json({msg: "Usuário não existe!"});
      } else {
        const response = await alunoModel.delete(req.body.nome_aluno, req.body.ra_aluno);
        const response2 = await usuarioModel.delete(usuario[0].nome_usuario, usuario[0].id_usuario);

        console.log("Deletando aluno e seu usuario correspondete\n","[",req.body.ra_aluno, ",", req.body.nome_aluno,"]",response);
        
        if(response.affectedRows != 0 && response2) return res.status(200).json({response});
        else if(response.affectedRows === 0) return res.status(500).json({msg: 'Aluno já foi deletado ou inexistente.'});
        else return res.status(500).json({response});
      }
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  }
};