const connection = require('../config/connection');
const query_exec = require('../helpers/query_exec');

module.exports = {
  insert({nome_curso, ano_curso, tipo_curso, coordenador_curso}) {
    return query_exec(
      connection,
      "insert into curso (nome_curso, ano_curso, tipo_curso, coordenador_curso) values (?, ?, ?, ?)",
      [nome_curso, ano_curso, tipo_curso, coordenador_curso]
    );
  },

  getAll() {
    return query_exec(
      connection,
      "select * from curso",
      []
    );
  },

  getById(id_curso) {
    return query_exec(connection,
      "select * from curso where id_curso = ?",
      [id_curso]
    );
  },

  getByCursoNome(nome_curso) {
    return query_exec(connection,
      "select * from curso where nome_curso = ?",
      [nome_curso]
    );
  },

  getByAno(ano_curso) {
    return query_exec(
      connection,
      "select * from curso where ano_cruso = ?",
      [ano_curso]
    );
  },

  delete(nome_curso, tipo_curso) {
    try {
      return query_exec(
        connection,
        'delete from curso where nome_curso = ? and tipo_curso = ?',
        [nome_curso, tipo_curso]);
    } catch(e) {
      console.error(e);
      throw e;
    }
  }
};