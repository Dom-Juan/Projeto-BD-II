const connection = require('../config/connection');
const query_exec = require('../helpers/query_exec');

module.exports = {
  insert({nome_coord, tipo_usuario_coord, curso_coord, data_como_coord}) {
    return query_exec(
      connection,
      "insert into coordenador (nome_coord, tipo_usuario_coord, curso_coord, data_como_coord) values (?, ?, ?, ?, ?)",
      [nome_coord, tipo_usuario_coord, curso_coord, data_como_coord]
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

  getByRa(ra_aluno) {
    return query_exec(
      connection,
      "select * from usuario where ra_aluno = ?",
      [ra_aluno]
    );
  },

  getByNome(nome_coord) {
    return query_exec(
      connection,
      "select * from coordenador where email = ?",
      [nome_coord]
    );
  },

  deleteCoord(id_coord, nome_coord) {
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