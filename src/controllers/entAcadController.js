'use strict';
const cursoModel = require('../models/cursoModel');
const entAcademicaModel = require('../models/entAcademicaModel');

module.exports = {
  async insert(req, res) {
    let curso = undefined;
    try {
      const entidade = await entAcademicaModel.getByNome(req.body.nome_ent_acad);

      if (entidade.length != 0) {
        return res.json({ msg: "Essa entidade já existe no banco!" });
      }

      curso = await cursoModel.getByCursoNome(req.body.curso_ent_acad);
      console.log(curso);

      if(curso[0] !== undefined && curso[0].nome_curso !== undefined  && curso.length != 0) {
        const newEntidade = entAcademicaModel.insert(req.body);

        console.log(newEntidade);
  
        return res.status(200).json({criado: newEntidade, msg:"Entidade criada!"});
      } else {
        return res.status(500).json({ msg:"Curso não existe no banco de dados" });
      }

    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  },

  async index(req, res) {
    try {
      const response = await entAcademicaModel.getAll();
      if (response) return res.status(200).json({ entidades: response });
    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  },

  async getById(req, res) {
    try {
      const response = await entAcademicaModel.getById(req.body.id_ent_acad);
      if (response) return res.status(200).json({ response });
    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  },

  async getByCursoNome(req, res) {
    try {
      const response = await entAcademicaModel.getByCursoNome(req.body.curso_ent_acad);
      if (response) return res.status(200).json({ response });
    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  },

  async deleteEntidade(req, res) {
    try {
      const response = await entAcademicaModel.delete(req.body.nome_ent_acad, req.body.ano_abertura_acad);
      if(response.affectedRows != 0) return res.status(200).json({response});
      else return res.status(500).json({msg: 'Entidade já foi deletada ou é inexistente.'});
    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  }

};