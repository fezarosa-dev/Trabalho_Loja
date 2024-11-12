const express = require("express");
const { Client } = require("pg");

const app = express();
const port = 3000;

app.use(express.json());

// Classe Banco para gerenciar a conexão com o banco de dados
class Banco {
    static conexao;
    static async init() {
            // Inicializar a conexão com o banco de dados
    /**
     * @description Inicia a conexão com o banco de dados
     */
        try {
            this.conexao = new Client({
                host: "127.0.0.1",
                port: 5432,
                database: "node", // Troque o nome do banco se necessário
                user: "postgres", // Troque o usuário se necessário
                password: "2121", // Troque a senha se necessário
            });
            await this.conexao.connect();
            console.log("");
            console.log("==========================================================");
            console.log(`✔  Conexão estabelecida com sucesso!`);
            console.log(`👉 Host: ${this.conexao.host}`);
            console.log(`👉 Banco de Dados: ${this.conexao.database}`);
            console.log(`👉 Usuário: ${this.conexao.user}`);
            console.log(`👉 Porta: ${this.conexao.port}`);
            console.log("==========================================================");
        } catch (erro) {
            console.error(`⚠️ Erro de conexão: ${erro.message}`);
            console.log("==========================================================");
        }
    }

    // Fechar a conexão com o banco de dados
    static async close() {
        if (this.conexao) {
            await this.conexao.end();
            console.log(`❌  Conexão encerrada com sucesso!`);
            console.log("==========================================================");
        } else {
            console.log("");
            console.log(`⚠️ Nenhuma conexão ativa para encerrar.`);
            console.log("==========================================================");
        }
    }
};

module.exports = Banco;
