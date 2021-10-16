const connection = require('../config/connection');
const query_exec = require('../helpers/query_exec');

module.exports = {
  insert({nome_usuario, curso, tipo_usuario, email_usuario, senha}) {
    return query_exec(
      connection,
      "insert into usuario (nome_usuario, curso, tipo_usuario, email_usuario, senha) values (?, ?, ?, ?, ?)",
      [nome_usuario, curso, tipo_usuario, email_usuario, senha]
    );
  },

  getAll() {
    return query_exec(
      connection,
      "select * from usuario",
      []
    );
  },

  getById(id_usuario) {
    return query_exec(
      connection,
      "select * from usuario where id_usuario = ?",
      [id_usuario]
    );
  },

  getByCurso(curso) {
    return query_exec(connection,
      "select * from usuario where curso = ?",
      [curso]
    );
  },

  getByEmail(email_usuario) {
    return query_exec(
      connection,
      "select * from usuario where email = ?",
      [email_usuario]
    );
  },

  deleteUsuario(nome_usuario, email_usuario) {
    try {
      return query_exec(
        connection,
        'select * from usuario where nome_usuario = ? and email_usuario = ?',
        [nome_usuario, email_usuario]);
    } catch(e) {
      console.error(e);
      throw e;
    }
  }
};