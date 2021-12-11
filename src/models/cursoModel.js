const connection = require('../config/connection');
const query_exec = require('../helpers/query_exec');

module.exports = {
  insert({nome_curso, ano_curso, tipo_curso, coordenador_curso}, nome_responsavel) {
    return query_exec(
      connection,
      "call inserir_curso_tabela(?, ?, ?, ?, ?)",
      [nome_curso, ano_curso, tipo_curso, coordenador_curso, nome_responsavel]
    );
  },

  update({nome_curso, ano_curso, tipo_curso, coordenador_curso}, nome_responsavel, nome_antigo) {
    return query_exec(
      connection,
      "call atualizar_curso(?, ?, ?, ?, ?, ?)",
      [nome_antigo, nome_curso, ano_curso, tipo_curso, coordenador_curso, nome_responsavel]
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

  delete(nome_curso, nome_responsavel) {
    try {
      console.log(nome_responsavel);
      return query_exec(
        connection,
        'call deletar_curso_tabela(?, ?)',
        [nome_curso, nome_responsavel]);
    } catch(e) {
      console.error(e);
      throw e;
    }
  }
};