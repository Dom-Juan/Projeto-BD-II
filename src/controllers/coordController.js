'use strict';
const usuarioModel = require('../models/usuarioModel');
const coordModel = require('../models/coordModel');

module.exports = {
  async insert(req, res) {
    let usuario = undefined;
    let nome_responsavel = req.body.nome_responsavel;
    try {
      const coordenador = await coordModel.getByNome(req.body.nome_coord);

      if (coordenador.length != 0) {
        return res.json({ msg: "Coordenador já existe no banco!" });
      }

      usuario = await usuarioModel.getById(req.body.id_usuario);
      if (usuario[0].id_usuario !== undefined) {
        console.table(usuario);

        if (usuario.length === 0) {
          return res.status(500).json({ msg: "Usuário não existe!" });
        } else {
          if (usuario[0].tipo_usuario === "coordenador") {
            const newCoordenador = await coordModel.insert(req.body, usuario[0].id_usuario, nome_responsavel);
            console.log("Coordenador a ser inserido:", newCoordenador);
            return res.json({ newCoordenador });
          } else {
            return res.status(500).json({ msg: "Usuário é um aluno." });
          }
        }
      } else {
        return res.status(500).json({ msg: "Impossível ler undefined de usuário" });
      }
    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  },

  async index(req, res) {
    try {
      const response = await coordModel.getAll();
      if (response) return res.status(200).json({ coordenadores: response });
    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  },

  async getById(req, res) {
    try {
      const response = await coordModel.getById(req.body.id_coord_usuario);
      if (response) return res.status(200).json({ response });
    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  },

  async getByCurso(req, res) {
    try {
      const response = await coordModel.getById(req.body.curso_coord);
      if (response) return res.status(200).json({ response });
    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  },

  async deleteCoordenador(req, res) {
    try {
      let nome_responsavel = req.body.nome_responsavel;
      console.log("Dono da ação: ", nome_responsavel);
      let usuario = await usuarioModel.getById(req.body.id_coord_usuario);
      let coordTeste = await coordModel.getById(req.body.id_coord_usuario);
      if (usuario.length === 0 && coordTeste === 0) {
        return res.status(500).json({ msg: "Usuário não existe! ou já foi deletado" });
      } else {
        const response = await coordModel.delete(req.body.id_coord_usuario, req.body.nome_coord, nome_responsavel);

        console.log("Deletando coordenador e seu usuario correspondete\n", "[", req.body.id_coord_usuario, ",", req.body.nome_coord, "]", response);

        if (response.affectedRows != 0) return res.status(200).json({ response });
        else if (response.affectedRows === 0) return res.status(500).json({ msg: 'Coordenador já foi deletado ou inexistente.' });
        else return res.status(500).json({ response });
      }
    } catch (error) {
      console.error(error);
      return res.status(error.code).json({ msg: error.code + error.message });
    }
  }
};