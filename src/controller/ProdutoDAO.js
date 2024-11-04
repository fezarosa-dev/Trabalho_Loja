const Banco = require("../model/Banco");

//DAO -> Data Acess Object
module.exports = class ProdutoDAO {
    // Listando Dados
    async listar(dep) {
        let departamento = dep;
        try {
            Banco.init();
            let tabela = await Banco.conexao.query(
                "SELECT codigo, descricao, preco, qtde, imagem FROM produto WHERE coddep = $1",
                [departamento]
            ); // Adicionei "FROM produto"
            Banco.close();
            return tabela;
        } catch (erro) {
            console.log("");
            console.log(
                "=========================================================="
            );
            console.log('ERRO AO LISTAR PRODUTOS',erro);
            console.log(
                "=========================================================="
            );
            console.log("");
        }
    }
    async verificarQTD(cod) {
        let quantidade = null; // Inicializa a quantidade como null
        try {
            Banco.init();
            const resultado = await Banco.conexao.query(
                "SELECT qtde FROM produto WHERE codigo = $1",
                [cod]
            );

            // Verifica se a consulta retornou algum resultado
            if (resultado.rows.length > 0) {
                quantidade = resultado.rows[0].qtde; // Acessa a quantidade do primeiro registro
            } else {
                console.log(`Produto com código ${cod} não encontrado.`);
            }
        } catch (erro) {
            console.log("");
            console.log("==========================================================");
            console.log(erro);
            console.log("==========================================================");
            console.log("");
        } finally {
            Banco.close(); // Fecha a conexão no bloco finally
        }

        return quantidade; // Retorna a quantidade encontrada ou null
    }
// Exemplo do método buscarPorCodigo no ProdutoDAO
async buscarPorCodigo(codigo) {
    let resultado = null; // Inicializa o resultado como null
    try {
        Banco.init();
        resultado = await Banco.conexao.query(
            'SELECT descricao, preco, qtde, imagem FROM produto WHERE codigo = $1',
            [codigo]
        );

        // Verifica se a consulta retornou algum resultado
        if (resultado.rows.length === 0) {
            console.log(`Produto com código ${codigo} não encontrado.`);
            return null; // Retorna null se o produto não for encontrado
        }

        return resultado.rows[0]; // Retorna o primeiro registro encontrado
    } catch (erro) {
        console.log("==========================================================");
        console.log(erro);
        console.log("==========================================================");
        return null; // Retorna null em caso de erro
    } finally {
        Banco.close(); // Fecha a conexão no bloco finally
    }
}
async atualizarQuantidade(codigo, novaQuantidade) {
    try {
        Banco.init();
        await Banco.conexao.query(
            "UPDATE produto SET qtde = $1 WHERE codigo = $2",
            [novaQuantidade, codigo]
        );
    } catch (erro) {
        console.log("");
        console.log("==========================================================");
        console.log("ERRO AO ATUALIZAR QUANTIDADE DO PRODUTO", erro);
        console.log("==========================================================");
        console.log("");
    } finally {
        Banco.close();
    }
}



};
