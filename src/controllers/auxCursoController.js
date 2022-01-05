'use strict';
const auxCursoModel = require('../models/auxCursoModel');
const alunoModel = require('../models/alunoModel');

module.exports = {
  async insert(req, res) {
    let aluno = undefined;
    try {
      const auxCurso = await auxCursoModel.getById(req.body.id_aux_curso);

      if (auxCurso.length != 0) {
        return res.json({ msg: "Curso já existe no banco!!" });
      }

      aluno = await alunoModel.getById(req.body.id_aluno_aux_curso);

      console.log(aluno);

      if (aluno[0].nome_aluno === undefined)
        return res.status(500).json({ msg: "Aluno não existe!!" });
        
      if (aluno[0].id_aluno_usuario !== undefined) {
        const newAuxCurso = await auxCursoModel.insert(req.body, req.body.nome_responsavel);
        console.log("Inserindo no aux curso:", newAuxCurso);
        return res.json({ newAuxCurso });
      } else {
        return res.status(500).json({ msg: "Aluno não existe!!" });
      }
    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  },

  async update(req, res) {
    let aluno = undefined;
    try {
      const auxCurso = await auxCursoModel.getById(req.body.id_aux_curso);

      if (!auxCurso[0].nome_aux_curso) {
        return res.json({ msg: "Curso não existe no banco!" });
      }

      if (req.body.coordenador_curso === undefined)
        return res.status(500).json({ msg: "Coordenador não existe." });

      aluno = await coordModel.getByNome(req.body.coordenador_curso);
      if (aluno[0].id_coord_usuario !== undefined) {
        console.table(aluno);

        if (aluno.length === 0) {
          return res.status(500).json({ msg: "Usuário não existe!" });
        } else {
          if (aluno[0].tipo_usuario_coord === "coordenador") {
            const updatedCurso = await auxCursoModel.update(req.body, req.body.nome_responsavel);
            console.log("Curso a ser atualizado:", updatedCurso);
            return res.json({ updatedCurso });
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
      const response = await auxCursoModel.getAll();
      if (response) return res.status(200).json({ cursos: response });
    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  },

  async getById(req, res) {
    try {
      const response = await auxCursoModel.getById(req.body.id_aux_curso);
      if (response) return res.status(200).json({ response });
    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  },

  async getByIdAluno(req, res) {
    try {
      const response = await auxCursoModel.getByIdAluno(req.body.id_aluno);
      if (response) return res.status(200).json({ response });
    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  },

  async deleteCurso(req, res) {
    try {
      console.log(req.body);
      const seek = await auxCursoModel.getById(req.body.id_aux_curso);
      if (seek.length === 0) {
        return res.status(500).json({ msg: "500: Curso não existe no banco!!" });
      }
      const response = await auxCursoModel.delete(req.body.id_aux_curso, req.body.nome_responsavel);
      if (response) return res.status(200).json({ response });
    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  }
};