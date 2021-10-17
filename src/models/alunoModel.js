const connection = require('../config/connection');
const query_exec = require('../helpers/query_exec');

module.exports = {
  insert({ra_aluno, nome_aluno, ano_nascimento_aluno, curso_aluno, tipo_usuario_aluno, tipo_grad_aluno}, id) {
    return query_exec(
      connection,
      "insert into aluno (id_aluno, ra_aluno, nome_aluno, ano_nascimento_aluno, curso_aluno, tipo_usuario_aluno, tipo_grad_aluno) values (?, ?, ?, ?, ?, ?, ?)",
      [id, ra_aluno, nome_aluno, ano_nascimento_aluno, curso_aluno, tipo_usuario_aluno, tipo_grad_aluno]
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
      "select * from aluno where curso_aluno = ?",
      [curso_aluno]
    );
  },

  getByRa(ra_aluno) {
    return query_exec(
      connection,
      "select * from aluno where ra_aluno = ?",
      [ra_aluno]
    );
  },

  getByNome(nome_aluno) {
    return query_exec(
      connection,
      "select * from aluno where nome_aluno = ?",
      [nome_aluno]
    );
  },

  getByTipoGradAluno(tipo_grad_aluno) {
    return query_exec(
      connection,
      "select * from aluno where tipo_grad_aluno = ?",
      [tipo_grad_aluno]
    );
  },

  delete(nome_aluno, ra_aluno) {
    try {
      console.log("Deletado [Aluno: ",nome_aluno,"RA: ", ra_aluno,"]");
      return query_exec(
        connection,
        'delete from aluno where nome_aluno = ? and ra_aluno = ?',
        [nome_aluno, ra_aluno]);
    } catch(e) {
      console.error(e);
      throw e;
    }
  }
};