const connection = require('../config/connection');
const query_exec = require('../helpers/query_exec');

module.exports = {
  insert({ra_aluno, nome_aluno, ano_nascimento_aluno, curso_aluno, tipo_usuario_aluno, tipo_grad_aluno}) {
    return query_exec(
      connection,
      "insert into aluno (ra_aluno, nome_aluno, ano_nascimento_aluno, curso_aluno, tipo_usuario_aluno, tipo_grad_aluno) values (?, ?, ?, ?, ?)",
      [ra_aluno, nome_aluno, ano_nascimento_aluno, curso_aluno, tipo_usuario_aluno, tipo_grad_aluno]
    );
  },

  getAll() {
    return query_exec(
      connection,
      "select * from aluno",
      []
    );
  },

  getByCurso(curso_aluno) {
    return query_exec(connection,
      "select * from aluno where curso = ?",
      [curso_aluno]
    );
  },

  getByRa(ra_aluno) {
    return query_exec(
      connection,
      "select * from aluno where email = ?",
      [ra_aluno]
    );
  },

  deleteUsuario(nome_aluno, ra_aluno) {
    try {
      return query_exec(
        connection,
        'select * from aluno where nome_aluno = ? and ra_aluno = ?',
        [nome_aluno, ra_aluno]);
    } catch(e) {
      console.error(e);
      throw e;
    }
  }
};