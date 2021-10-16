const connection = require('../config/connection');
const query_exec = require('../helpers/query_exec');

module.exports = {
  insert({
    data_ini_atividade,
    data_fim_atividade,
    nome_atividade,
    ra_aluno_atividade,
    tipo_curso_atividade,
    horas_atividade,
    tipo_atividade,
    url_atividade
  }) {
    return query_exec(
      connection,
      "insert into atividade_extra (data_ini_atividade, data_fim_atividade, nome_atividade, ra_aluno_atividade, tipo_curso_atividade, horas_atividade, tipo_atividade, url_atividade) values (?, ?, ?, ?, ?)",
      [data_ini_atividade, data_fim_atividade, nome_atividade, ra_aluno_atividade, tipo_curso_atividade, horas_atividade, tipo_atividade, url_atividade]
    );
  },

  getAll() {
    return query_exec(
      connection,
      "select * from atividade_extra",
      []
    );
  },

  getByRaAluno(ra_aluno_atividade) {
    return query_exec(connection,
      "select * from atividade_extra where ra_aluno_atividade = ?",
      [ra_aluno_atividade]
    );
  },

  getByHoras(horas_atividade) {
    return query_exec(
      connection,
      "select * from atividade_extra where horas_atividade = ?",
      [horas_atividade]
    );
  },

  getByDataInicial(data_ini_atividade) {
    return query_exec(
      connection,
      "select * from atividade_extra where data_ini_atividade = ?",
      [data_ini_atividade]
    );
  },

  getByDataFinal(data_fim_atividade) {
    return query_exec(
      connection,
      "select * from atividade_extra where data_fim_atividade = ?",
      [data_fim_atividade]
    );
  },

  getAtividadeURL(id_atividade, nome_atividade, ra_aluno_atividade) {
    return query_exec(
      connection,
      "select * from atividade_extra where id_atividade = ? and nome_atividade = ? and ra_aluno_atividade = ?",
      [id_atividade, nome_atividade, ra_aluno_atividade]
    );
  },

  deleteAtividade(id_atividade, nome_atividade) {
    try {
      return query_exec(
        connection,
        'select * from atividade_extra where id_atividade = ? and nome_atividade = ?',
        [id_atividade, nome_atividade]);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
};