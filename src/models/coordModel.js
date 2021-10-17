const { customAlphabet } = require('nanoid');
const connection = require('../config/connection');
const query_exec = require('../helpers/query_exec');

const nanoid = customAlphabet('abcde1234567089', 3);

module.exports = {
  insert({nome_coord, tipo_usuario_coord, curso_coord, data_como_coord}) {
    return query_exec(
      connection,
      "insert into coordenador (id_coord, nome_coord, tipo_usuario_coord, curso_coord, data_como_coord) values (?, ?, ?, ?, ?)",
      [nanoid(3), nome_coord, tipo_usuario_coord, curso_coord, data_como_coord]
    );
  },

  getAll() {
    return query_exec(
      connection,
      "select * from coordenador",
      []
    );
  },

  getByCurso() {
    return query_exec(connection,
      "select * from coordenador where curso = ?",
      [curso_coord]
    );
  },

  getByNome(nome_coord) {
    return query_exec(
      connection,
      "select * from coordenador where email = ?",
      [nome_coord]
    );
  },

  delete(id_coord, nome_coord) {
    try {
      return query_exec(
        connection,
        'select * from coordenador where id_coord = ? and nome_coord = ?',
        [id_coord, nome_coord]);
    } catch(e) {
      console.error(e);
      throw e;
    }
  }
};