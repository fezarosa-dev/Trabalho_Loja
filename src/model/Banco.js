const { Client } = require('pg');

class Banco {
  static conexao;
  static init() {
    try {
      this.conexao = new Client({
        host: '127.0.0.1',
        port: 5432,
        database: 'node',
        user: 'postgres',
        password: '2121',
      });
      this.conexao.connect();
    }
    catch (erro) {
      console.log("Erro de conexao : " + erro);
    }
  }
}
module.exports = Banco;