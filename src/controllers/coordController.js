'use strict';
const usuarioModel = require('../models/usuarioModel');
const coordModel = require('../models/coordModel');

module.exports = {
  async insert(req, res) {
    let usuario = undefined;
    try {
      const coordenador = await coordModel.getByNome(req.body.nome_coord);

      if(coordenador.length != 0) {
        return res.json({msg: "Coordenador já existe no banco!"});
      }

      usuario = await usuarioModel.getById(req.body.id_usuario);
      console.log("Usuário pego: ", usuario);
      console.log("ID úsuário:", usuario[0].id_usuario);

      if(usuario.length === 0) {
        return res.status(500).json({msg: "Usuário não existe!"});
      } else {
        if(usuario[0].tipo_usuario === "coordenador") {
          const newCoordenador = await coordModel.insert(req.body, usuario[0].id_usuario);
          console.log("Coordenador a ser inserido:", newCoordenador);
          return res.json({newCoordenador});
        } else {
          return res.status(500).json({msg: "Usuário é um aluno."});
        }
      }
    } catch(error) {
      console.error(error);
      return res.status(error.code).json({msg: error.code + error.message});
    }
  },

  async index(req, res) {
    try {
      const response = await coordModel.getAll();
      if(response) return res.status(200).json({coordenadores: response});
    } catch(error) {
      console.error(error);
      return res.status(error.code).json({msg: error.code + error.message});
    }
  },

  async getById(req, res) {
    try {
      const response = await coordModel.getById(req.body.id_coord);
      if(response) return res.status(200).json({response});
    } catch(error) {
      console.error(error);
      return res.status(error.code).json({msg: error.code + error.message});
    }
  },

  async getByCurso(req, res) {
    try {
      const response = await coordModel.getById(req.body.curso_coord);
      if(response) return res.status(200).json({response});
    } catch(error) {
      console.error(error);
      return res.status(error.code).json({msg: error.code + error.message});
    }
  },

  async deleteCoordenador(req, res) {
    try {
      let usuario = await usuarioModel.getById(req.body.id_usuario);
      if(usuario.length === 0) {
        return res.status(500).json({msg: "Usuário não existe!"});
      } else {
        const response = await coordModel.delete(req.body.nome_coord, req.body.id_coord);
        const response2 = await usuarioModel.delete(usuario[0].nome_usuario, usuario[0].id_usuario)
        if(response.affectedRows != 0 && response2) return res.status(200).json({response});
        else if(response.affectedRows === 0) return res.status(500).json({msg: 'Aluno já foi deletado ou inexistente.'});
        else return res.status(500).json({response});
      }
    } catch(error) {
      console.error(error);
      return res.status(error.code).json({msg: error.code + error.message});
    }
  }
};