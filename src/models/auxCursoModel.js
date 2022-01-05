const connection = require('../config/connection');
const query_exec = require('../helpers/query_exec');

module.exports = {
  insert({id_aux_curso, id_aluno_aux_curso, nome_aux_curso}, nome_responsavel) {
    return query_exec(
      connection,
      "call inserir_aux_curso_tabela(?, ?, ?, ?)",
      [id_aux_curso, id_aluno_aux_curso, nome_aux_curso, nome_responsavel]
    );
  },

  update({id_aux_curso, id_aluno_aux_curso, nome_aux_curso}, nome_responsavel) {
    return query_exec(
      connection,
      "call atualizar_aux_curso(?, ?, ?, ?)",
      [id_aux_curso, id_aluno_aux_curso, nome_aux_curso, nome_responsavel]
    );
  },

  getAll() {
    return query_exec(
      connection,
      "select * from aux_curso",
      []
    );
  },

  getById(id_aux_curso) {
    return query_exec(connection,
      "select * from aux_curso where id_aux_curso = ?",
      [id_aux_curso]
    );
  },

  getByIdAluno(id_aluno_aux_curso) {
    return query_exec(connection,
      "select * from aux_curso where id_aluno_aux_curso = ?",
      [id_aluno_aux_curso]
    );
  },

  delete(id_aux_curso, nome_responsavel) {
    try {
      console.log(nome_responsavel);
      return query_exec(
        connection,
        'call deletar_aux_curso_tabela(?, ?)',
        [id_aux_curso, nome_responsavel]);
    } catch(e) {
      console.error(e);
      throw e;
    }
  }
};