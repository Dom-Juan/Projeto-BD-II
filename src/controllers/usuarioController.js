'use strict';
const usuarioModel = require('../models/usuarioModel');
const alunoModel = require('../models/alunoModel');

module.exports = {
  async insert(req, res) {
    try {
      let user = await usuarioModel.getByEmail(req.body.email_usuario);

      if(user.length != 0) {
        return res.json({msg:"Este usuário já existe!"});
      }

      user = await usuarioModel.getByUsername(req.body.nome_usuario);

      if(user.length != 0) {
        return res.json({msg:"Este usuário já existe!"});
      }

      const newUser = await usuarioModel.insert(req.body, undefined);

      console.log("Usuário a ser inserido:", newUser);

      return res.json({newUser});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: "internal server error"});
    }
  },

  async insert_frontend(req, res) {
    let aluno = await alunoModel.getByRa(req.body.ra_aluno);
    let user = await usuarioModel.getByEmail(req.body.email_usuario);
    
    console.log(req.body);
    
    try{
      console.log(req.body);

      if(aluno.length != 0) {
        return res.json({msg:"Este usuário já existe!"});
      } 

      user = await usuarioModel.getByUsername(req.body.nome_usuario);

      if(aluno.length != 0) {
        return res.json({msg:"Este usuário já existe!"});
      }
      
      if(user.length != 0) {
        return res.json({msg:"Este usuário já existe!"});
      }

      const newUser = await usuarioModel.insert(req.body, req.body.id_usuario);
      const newAluno = await alunoModel.insert(req.body, req.body.id_usuario);

      return res.json({newUser, msg: "Usuário criado"});
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
      const getId = await usuarioModel.getById(req.body.id_usuario);
      if(getId) return res.status(200).json(getId);
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  },

  async getByCurso(req, res) {
    try {
      const getCurso = await usuarioModel.getById(req.body.curso);
      if(getCurso) return res.status(200).json(getCurso);
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  },

  async getByEmail(req, res) {
    try {
      console.log("Usário a ser pego: ", req.body);
      const getEmail = await usuarioModel.getByEmail(req.body.email_usuario);
      if(getEmail) return res.status(200).json(getEmail);
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