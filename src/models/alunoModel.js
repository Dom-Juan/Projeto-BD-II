const connection = require('../config/connection');
const query_exec = require('../helpers/query_exec');

module.exports = {
  insert({ ra_aluno, nome_aluno, nome_ent_acad_aluno, ano_nascimento_aluno, curso_aluno, tipo_usuario_aluno, tipo_grad_aluno }, id) {
    return query_exec(
      connection,
      "insert into aluno (id_aluno_usuario, ra_aluno, nome_aluno, nome_ent_acad_aluno, ano_nascimento_aluno, curso_aluno, tipo_usuario_aluno, tipo_grad_aluno) values (?, ?, ?, ?, ?, ?, ?, ?)",
      [id, ra_aluno, nome_aluno, nome_ent_acad_aluno, ano_nascimento_aluno, curso_aluno, tipo_usuario_aluno, tipo_grad_aluno]
    );
  },

  update({ ra_aluno, nome_aluno, nome_ent_acad_aluno, ano_nascimento_aluno, tipo_usuario_aluno, tipo_grad_aluno }, id, nome_responsavel) {
    return query_exec(
      connection,
      "call atualizar_aluno_tabela (?, ?, ?, ?, ?, ?, ?)",
      [id, ra_aluno, nome_aluno, nome_ent_acad_aluno, ano_nascimento_aluno, tipo_grad_aluno, nome_responsavel]
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

  getById(id_aluno_usuario) {
    return query_exec(
      connection,
      "select * from aluno where id_aluno_usuario = ?",
      [id_aluno_usuario]
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
      console.log("Deletado [Aluno: ", nome_aluno, "RA: ", ra_aluno, "]");
      return query_exec(
        connection,
        'delete from aluno where nome_aluno = ? and ra_aluno = ?',
        [nome_aluno, ra_aluno]);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
};