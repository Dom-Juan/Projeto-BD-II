'use strict';
const horasModel = require('../models/horasModel');
const coorModel = require('../models/coordModel');

module.exports = {
  async insert(req, res) {
    try {
      console.log("** Cadastro de horas **");
      console.log(req.body);
      const hora = await horasModel.getByNome(req.body.nome_hora);
      
      if(hora.length != 0) {
        return res.json({msg:"Esta hora complementar com este nome já existe!"});
      }

      const newHoraComplementar = await horasModel.insert(req.body);
    
      return res.json({newHoraComplementar});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: "internal server error"});
    }
  },

  async update(req, res) {
    try {
      console.log("** Edição de horas **");
      console.log(req.body);
      const hora = await horasModel.getByNome(req.body.nome_hora_antiga);
      const id_hora = hora[0].id_hora;
      
      if(hora.length == 0) {
        return res.json({msg:"Esta hora complementar com este nome não existe!"});
      }

      const updatedHoraComplementar = await horasModel.update(req.body, id_hora);
    
      return res.json({updatedHoraComplementar});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: "internal server error"});
    }
  },

  async index(req, res) {
    try {
      const response = await horasModel.getAll();
      if(response) return res.status(200).json({horas_complementares: response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error.'});
    }
  },

  async getById(req, res) {
    try {
      const response = await horasModel.getById(req.body.id_hora);
      if(response) return res.status(200).json({response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  },

  async getByNome(req, res) {
    try {
      const response = await horasModel.getByNome(req.body.nome_hora);
      if(response) return res.status(200).json({response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  },

  async getByCurso(req, res) {
    try {
      const response = await horasModel.getByCurso(req.body.nome_curso_hora);
      if(response) return res.status(200).json({response});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  },

  async deleteHora(req, res) {
    try {
      console.log("** Deletar horas **");
      console.log(req.body);
      const hora = await horasModel.getByNome(req.body.nome_hora);
      const id_hora = hora[0].id_hora;
      const response = await horasModel.delete(id_hora, req.body.nome_hora, req.body.nome_responsavel);
      console.log("Deletando hora complementar","[",id_hora, ",", req.body.nome_hora,"]",response);
      if(response.affectedRows != 0) return res.status(200).json({response});
      else return res.status(500).json({msg: 'Hora complementar já foi deletada ou é inexistente.'});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  }
};