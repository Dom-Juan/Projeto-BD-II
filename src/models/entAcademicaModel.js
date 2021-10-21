const connection = require('../config/connection');
const query_exec = require('../helpers/query_exec');

module.exports = {
  insert({nome_ent_acad, ano_abertura_acad, curso_ent_acad, quant_alunos_acad, quant_horas_avaliar_acad}) {
    return query_exec(
      connection,
      "insert into ent_academica (nome_ent_acad, ano_abertura_acad, curso_ent_acad, quant_alunos_acad, quant_horas_avaliar_acad) values (?, ?, ?, ?, ?)",
      [nome_ent_acad, ano_abertura_acad, curso_ent_acad, quant_alunos_acad, quant_horas_avaliar_acad]
    );
  },

  getAll() {
    return query_exec(
      connection,
      "select * from ent_academica",
      []
    );
  },

  getByNome(nome_ent_acad) {
    return query_exec(
      connection,
      "select * from ent_academica where nome_ent_acad = ?",
      [nome_ent_acad]
    );
  },

  delete(nome_ent_acad, ano_abertura_acad) {
    try {
      return query_exec(
        connection,
        'delete from ent_academica where nome_ent_acad = ? and ano_abertura_acad = ?',
        [nome_ent_acad, ano_abertura_acad]);
    } catch(e) {
      console.error(e);
      throw e;
    }
  }
};