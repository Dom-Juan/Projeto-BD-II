const app = require ('./app');


// Iniciando o servidor com o app, contendo as API.
app.listen(3333, () => {
  console.log("========== Iniciando o back-end ==========\n");
  console.log('Porta de acesso 3333');
});

app.on('close', () => {
  console.log("Servidor Fechado.");
});