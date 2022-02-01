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

  async update(req, res) {
    let usuario = undefined;
    let nome_responsavel = req.body.nome_responsavel;
    try {
      const coordenador = await coordModel.getById(req.body.id_usuario);

      if (coordenador[0] == undefined) {
        return res.json({ msg: "Coordenador não existe no banco!!!" });
      }

      usuario = await usuarioModel.getById(req.body.id_usuario);
      if (usuario[0].id_usuario !== undefined) {
        console.table(usuario);

        if (usuario.length === 0) {
          return res.status(500).json({ msg: "Usuário não existe!" });
        } else {
          if (usuario[0].tipo_usuario === "coordenador") {
            let obj = {
              nome_coord: req.body.nome_coord,
              nome_ent_acad_coord: req.body.nome_ent_acad_coord,
              data_como_coord: req.body.data_como_coord
            }
            const updatedCoordenador = await coordModel.update(obj, usuario[0].id_usuario, nome_responsavel);
            console.log("Coordenador a ser atualizado:", updatedCoordenador);
            return res.json({ updatedCoordenador });
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

  async getByIdFront(req, res) {
    try {
      console.log(req.query);
      const getId = await coordModel.getById(req.query.id_aluno_usuario);
      let obj = {
        id_coord_usuario: getId[0].id_coord_usuario,
        nome_coord: getId[0].nome_coord,
        nome_ent_acad_coord: getId[0].nome_ent_acad_coord,
        data_como_coord: getId[0].data_como_coord,
      }
      if(obj) return res.status(200).json(obj);
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: 'internal server error'});
    }
  },

  async insert_frontend(req, res) {
    let usuario = undefined;
    let nome_responsavel = req.body.nome_responsavel;
    
    console.table(req.body);
    
    try{
      
      let user = await usuarioModel.getByUsername(req.body.nome_usuario);

      if(user.length != 0) {
        return res.json({msg:"Este usuário já existe!"});
      }

      const coordenador = await coordModel.getByNome(req.body.nome_coord);

      if (coordenador.length != 0) {
        return res.json({ msg: "Coordenador já existe no banco!" });
      }

      const newUser = await usuarioModel.insert(req.body, req.body.id_usuario);
      const newCoordenador = await coordModel.insert(req.body, req.body.id_usuario, req.body.nome_responsavel);

      return res.json({newCoordenador, msg: "Usuário criado"});
    } catch(error) {
      console.error(error);
      return res.status(500).json({msg: "internal server error"});
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