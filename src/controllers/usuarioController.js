'use strict';
const usuarioModel = require('../models/usuarioModel');
const alunoModel = require('../models/alunoModel');
//const { get } = require('../../routes');

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

      console.table(newUser);

      return res.json({newUser});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: "internal server error"});
    }
  },

  async insert_frontend(req, res) {
    let aluno = await alunoModel.getByRa(req.body.ra_aluno);
    let user = await usuarioModel.getByEmail(req.body.email_usuario);
    
    console.table(req.body);
    
    try{

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

  async update(req, res) {
    let check = undefined;
    try {
      check = await usuarioModel.getById(req.body.id_usuario);
      
      if(check.length === 0) {
        return res.status(500).json({msg: "Usuário não existe."});
      }

      const updatedUser = await usuarioModel.update(req.body);

      console.table(updatedUser);

      return res.json({updatedUser});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: "internal server error"});
    }
  },

  async update_password(req, res) {
    try {
      console.log(req.body);
      const oldUser = await usuarioModel.getById(req.body.id_usuario);
      if(req.body.id_usuario === oldUser[0].id_usuario) {
        let newPSW = {
          id_usuario: req.body.id_usuario,
          nome_usuario: oldUser[0].nome_usuario,
          senha_usuario: req.body.senha,
        }
        console.log(newPSW);
        const updatedUser = await usuarioModel.update_password(newPSW);
  
        console.table(updatedUser);
  
        return res.json({updatedUser});
      } else {
        return res.status(500).json({msg: "Erro ao verificar os IDs!"});
      }
      
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: "internal server error"});
    }
  },

  async update_email_and_psw(req, res) {
    try {
      console.log(req.body);
      const oldUser = await usuarioModel.getById(req.body.id_usuario);
      const otherUser = await usuarioModel.getByUsername(req.body.nome_usuario);
      console.log("Outro usuário com informações similares: \n", otherUser[0], otherUser.length);
      if(otherUser.length === 0) {
        console.log("Alteração feita: \n", req.body.nome_usuario, req.body.email_usuario, req.body.id_usuario, oldUser[0].nome_usuario);
        let updatedUser = await usuarioModel.update_email_and_psw(req.body.nome_usuario, req.body.email_usuario, req.body.id_usuario, oldUser[0].nome_usuario);
  
        console.table(updatedUser);
  
        return res.json({updatedUser});
      } else {
        return res.status(500).json({msg: "Nome de usuário ou email, já existe no sistema!"});
      }
      
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

  async getByIdFront(req, res) {
    try {
      console.log(req.query);
      const getId = await usuarioModel.getById(req.query.id_usuario);
      let obj = {
        id_usuario: getId[0].id_usuario,
        nome_usuario: getId[0].nome_usuario,
        curso: getId[0].curso,
        email_usuario: getId[0].email_usuario,
      }
      console.log("Acessando usuário: \n", obj);
      if(obj) return res.status(200).json(obj);
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
      const response = await usuarioModel.delete(req.body.nome_usuario, req.body.id_usuario);
      console.log(response);
      if(response.affectedRows != 0) return res.status(200).json({response});
      else return res.status(500).json({msg: 'Aluno já foi deletado ou inexistente.'});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  }
};