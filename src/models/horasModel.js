const { customAlphabet } = require('nanoid');

const connection = require('../config/connection');
const query_exec = require('../helpers/query_exec');
const nanoid = customAlphabet('1234567890', 3);

module.exports = {
  insert({nome_hora, carga_hora, limite_hora, procentagem_hora, nome_curso_hora, nome_r}) {
    return query_exec(
      connection,
      "call inserir_horas_tabela(?, ?, ?, ?, ?, ?, ?);",
      [nanoid(3), nome_hora, carga_hora, limite_hora, procentagem_hora, nome_curso_hora, nome_r]
    );
  },

  getAll() {
    return query_exec(
      connection,
      "select * from horas_complementares",
      []
    );
  },

  getById(id_hora) {
    return query_exec(
      connection,
      "select * from horas_complementares where id_hora = ?",
      [id_hora]
    );
  },

  getByNome(nome_hora) {
    return query_exec(connection,
      "select * from horas_complementares where nome_hora = ?",
      [nome_hora]
    );
  },

  getByCurso(nome_curso_hora) {
    return query_exec(connection,
      "select * from horas_complementares where nome_curso_hora = ?",
      [nome_curso_hora]
    );
  },

  delete(id_hora, nome_hora, nome_responsavel) {
    try {
      return query_exec(
        connection,
        'call deletar_horas_tabela(?, ?, ?)',
        [id_hora, nome_hora, nome_responsavel]);
    } catch(e) {
      console.error(e);
      throw e;
    }
  }
};