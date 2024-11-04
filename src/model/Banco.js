const { Client } = require("pg");

class Banco {
    static conexao;

    static async init() {
        try {
            this.conexao = new Client({
                host: "127.0.0.1",
                port: 5432,
                database: "node",
                user: "postgres",
                password: "2121",
            });
            await this.conexao.connect();
            console.log("");
            console.log("==========================================================");
            console.log(`✔  Conexão estabelecida com sucesso!`);
            console.log(`👉 Host: ${this.conexao.host}`);
            console.log(`👉 Banco de Dados: ${this.conexao.database}`);
            console.log(`👉 Usuário: ${this.conexao.user}`);
            console.log(`👉 Porta: ${this.conexao.port}`);
        } catch (erro) {
            console.error(`⚠️ Erro de conexão: ${erro.message}`);
            console.log("==========================================================");
            console.log("");
        }
    }

    static async close() {
        if (this.conexao) {
            await this.conexao.end();
            console.log(`❌  Conexão encerrada com sucesso!`);
            console.log("==========================================================");
            console.log("");
        } else {
            console.log("");
            console.log(`⚠️ Nenhuma conexão ativa para encerrar.`);
            console.log("==========================================================");
            console.log("");
        }
    }
}

module.exports = Banco;
