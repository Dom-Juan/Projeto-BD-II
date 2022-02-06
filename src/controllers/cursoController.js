'use strict';
const cursoModel = require('../models/cursoModel');
const coordModel = require('../models/coordModel');

module.exports = {
  async insert(req, res) {
    let coord = undefined;
    try {
      const curso = await cursoModel.getByCursoNome(req.body.nome_curso);

      if (curso.length != 0) {
        return res.json({ msg: "Curso já existe no banco!" });
      }

      if (req.body.coordenador_curso === undefined)
        return res.status(500).json({ msg: "Impossível ler undefined de um coordenador" });

      coord = await coordModel.getByNome(req.body.coordenador_curso);
      if (coord[0].id_coord_usuario !== undefined) {
        console.table(coord);

        if (coord.length === 0) {
          return res.status(500).json({ msg: "Usuário não existe!" });
        } else {
          if (coord[0].tipo_usuario_coord === "coordenador") {
            const newCurso = await cursoModel.insert(req.body, req.body.nome_responsavel);
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

  async update(req, res) {
    let coord = undefined;
    try {
      const curso = await cursoModel.getByCursoNome(req.body.nome_curso_antigo);

      if (!curso[0].nome_curso) {
        return res.json({ msg: "Curso não existe no banco!" });
      }

      if (req.body.coordenador_curso === undefined)
        return res.status(500).json({ msg: "Coordenador não existe." });

      coord = await coordModel.getByNome(req.body.coordenador_curso);
      if (coord[0].id_coord_usuario !== undefined) {
        console.table(coord);

        if (coord.length === 0) {
          return res.status(500).json({ msg: "Usuário não existe!" });
        } else {
          if (coord[0].tipo_usuario_coord === "coordenador") {
            const updatedCurso = await cursoModel.update(req.body, req.body.nome_responsavel, req.body.nome_curso_antigo);
            console.log("Curso a ser atualizado:", updatedCurso);
            return res.json({ curso });
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
      console.log("** Deletar curso **")
      console.log(req.body);
      const seek = await cursoModel.getByCursoNome(req.body.nome_curso);
      if (seek.length === 0) {
        return res.status(500).json({ msg: "500: Curso não existe no banco!!" });
      }
      const response = await cursoModel.delete(req.body.nome_curso, req.body.nome_responsavel);
      if (response) return res.status(200).json({ response });
    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  }
};