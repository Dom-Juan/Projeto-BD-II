const { customAlphabet } = require('nanoid');

const connection = require('../config/connection');
const query_exec = require('../helpers/query_exec');
const nanoid = customAlphabet('1234567890', 3);

module.exports = {
  insert({nome_usuario, curso, tipo_usuario, email_usuario, senha}, id) {
    if(id === undefined || id === null) {
      return query_exec(
        connection,
        "insert into usuario (id_usuario, nome_usuario, curso, tipo_usuario, email_usuario, senha) values (?, ?, ?, ?, ?, ?)",
        [nanoid(3), nome_usuario, curso, tipo_usuario, email_usuario, senha]
      );
    } else {{
      return query_exec(
        connection,
        "insert into usuario (id_usuario, nome_usuario, curso, tipo_usuario, email_usuario, senha) values (?, ?, ?, ?, ?, ?)",
        [id, nome_usuario, curso, tipo_usuario, email_usuario, senha]
      );
    }}
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

  getByUsername(nome_usuario) {
    return query_exec(connection,
      "select * from usuario where nome_usuario = ?",
      [nome_usuario]
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
      "select * from usuario where email_usuario = ?",
      [email_usuario]
    );
  },

  delete(nome_usuario, id_usuario) {
    try {
      return query_exec(
        connection,
        'delete from usuario where nome_usuario = ? and id_usuario = ?',
        [nome_usuario, id_usuario]);
    } catch(e) {
      console.error(e);
      throw e;
    }
  }
};