const connection = require('../config/connection');
const query_exec = require('../helpers/query_exec');

module.exports = {
  insert({nome_coord, nome_ent_acad_coord, tipo_usuario_coord, curso_coord, data_como_coord}, id_coord_usuario) {
    console.log("Id gerado: ", id_coord_usuario);
    return query_exec(
      connection,
      "insert into coordenador (id_coord_usuario, nome_coord, nome_ent_acad_coord, tipo_usuario_coord, curso_coord, data_como_coord) values (?, ?, ?, ?, ?, ?)",
      [id_coord_usuario, nome_coord, nome_ent_acad_coord, tipo_usuario_coord, curso_coord, data_como_coord]
    );
  },

  getAll() {
    return query_exec(
      connection,
      "select * from coordenador",
      []
    );
  },

  getByCurso(curso_coord) {
    return query_exec(connection,
      "select * from coordenador where curso = ?",
      [curso_coord]
    );
  },

  getById(id_coord_usuario) {
    return query_exec(
      connection,
      "select * from coordenador where id_coord_usuario = ?",
      [id_coord_usuario]
    );
  },

  getByNome(nome_coord) {
    return query_exec(
      connection,
      "select * from coordenador where nome_coord = ?",
      [nome_coord]
    );
  },

  delete(nome_coord, id_coord_usuario) {
    try {
      return query_exec(
        connection,
        'delete from coordenador where id_coord_usuario = ? and nome_coord = ?',
        [id_coord_usuario, nome_coord]);
    } catch(e) {
      console.error(e);
      throw e;
    }
  }
};