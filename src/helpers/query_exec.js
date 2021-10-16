// Executa a nossas querys do MYSQL no nosso banco de dados.
function query_exec(connection, sql, values) {
  return new Promise((resolve, reject) => {     // Retorna uma promeça/trigger, do qual ativa quando chamado
      connection.query( sql, values,            //pela API, o resultado pode ser um retorno do SQL ou um erro.
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );
    });
}

module.exports = query_exec;