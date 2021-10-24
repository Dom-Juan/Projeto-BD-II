'use strict';
const cursoModel = require('../models/cursoModel');
const coordModel = require('../models/coordModel');

module.exports = {
  async insert(req, res) {
    let coord = undefined;
    try {
      const curso = await cursoModel.getByCursoNome(req.body.nome_coord);

      if (curso.length != 0) {
        return res.json({ msg: "Curso já existe no banco!" });
      }

      coord = await coordModel.getByNome(req.body.coordenador_curso);
      if (coord[0].id_coord_usuario !== undefined) {
        console.log("Usuário pego: ", coord);
        console.log("ID úsuário:", coord[0].id_coord_usuario);

        if (coord.length === 0) {
          return res.status(500).json({ msg: "Usuário não existe!" });
        } else {
          if (coord[0].tipo_usuario_coord === "coordenador") {
            const newCurso = await cursoModel.insert(req.body);
            console.log("Curso a ser inserido:", newCurso);
            return res.json({ newCurso });
          } else {
            return res.status(500).json({ msg: "Usuário é um aluno." });
          }
        }
      } else {
        return res.status(500).json({ msg: "Impossível ler undefined de um coordenador" });
      }
    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  },

  async index(req, res) {
    try {
      const response = await cursoModel.getAll();
      if (response) return res.status(200).json({ cursos: response });
    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  },

  async getById(req, res) {
    try {
      const response = await cursoModel.getById(req.body.id_curso);
      if (response) return res.status(200).json({ response });
    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  },

  async getByCursoNome(req, res) {
    try {
      const response = await cursoModel.getByCursoNome(req.body.nome_curso);
      if (response) return res.status(200).json({ response });
    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  },

  async deleteCurso(req, res) {
    try {
      
    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  }
};