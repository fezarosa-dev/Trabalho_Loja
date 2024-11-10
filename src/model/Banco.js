const express = require("express");
const { Client } = require("pg");

const app = express();
const port = 3000;

app.use(express.json());

// Classe Banco para gerenciar a conexão com o banco de dados
class Banco {
    static conexao;

    // Inicializar a conexão com o banco de dados
    static async init() {
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

    // Adicionar um produto ao banco
    static async adicionarProduto(descricao, preco) {
        try {
            const resultado = await this.conexao.query(
                "INSERT INTO produto (descricao, preco, qtde) VALUES ($1, $2, 0) RETURNING *",
                [descricao, preco]
            );
            console.log(`✔ Produto adicionado com sucesso: ${resultado.rows[0].descricao}`);
            return resultado.rows[0];
        } catch (erro) {
            console.error(`⚠️ Erro ao adicionar produto: ${erro.message}`);
        }
    }

    // Remover um produto do banco
    static async removerProduto(codigo) {
        try {
            const resultado = await this.conexao.query(
                "DELETE FROM produto WHERE codigo = $1 RETURNING *",
                [codigo]
            );
            if (resultado.rowCount > 0) {
                console.log(`✔ Produto removido com sucesso: ${resultado.rows[0].descricao}`);
            } else {
                console.log("⚠️ Produto não encontrado.");
            }
        } catch (erro) {
            console.error(`⚠️ Erro ao remover produto: ${erro.message}`);
        }
    }

    // Listar todos os produtos (opcional)
    static async listarProdutos() {
        try {
            const resultado = await this.conexao.query("SELECT * FROM produto");
            return resultado.rows;
        } catch (erro) {
            console.error(`⚠️ Erro ao listar produtos: ${erro.message}`);
        }
    }
}

// Inicializa a conexão com o banco de dados
Banco.init();

// Rota para adicionar um produto
app.post("/produto", async (req, res) => {
    const { descricao, preco } = req.body;

    if (!descricao || !preco) {
        return res.status(400).json({ error: "Descrição e preço são obrigatórios." });
    }

    const produto = await Banco.adicionarProduto(descricao, preco);
    res.status(201).json(produto);
});

// Rota para remover um produto
app.delete("/produto/:id", async (req, res) => {
    const { id } = req.params;

    await Banco.removerProduto(id);
    res.status(200).json({ message: "Produto removido com sucesso!" });
});

// Rota para listar todos os produtos (opcional)
app.get("/produtos", async (req, res) => {
    const produtos = await Banco.listarProdutos();
    res.status(200).json(produtos);
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// Fechar a conexão ao finalizar o processo
process.on("exit", () => {
    Banco.close();
});
