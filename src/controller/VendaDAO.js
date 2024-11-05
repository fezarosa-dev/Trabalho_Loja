const Banco = require("../model/Banco");

module.exports = class VendaDAO {
    async salvar(venda) {
        try {
            Banco.init();

            // Inicia uma transação
            await Banco.conexao.query("BEGIN");

            // Insere a venda e obtém o código gerado
            const resultado = await Banco.conexao.query(
                "INSERT INTO venda (codcli, total, datav) VALUES ($1, $2, $3) RETURNING codigo",
                [venda.codcli, venda.total, venda.data]
            );
            const codigoVenda = resultado.rows[0].codigo;

            // Salva cada item da venda
            for (const item of venda.itens) {
                await Banco.conexao.query(
                    "INSERT INTO item (qtde, precounit, codproduto, codvenda) VALUES ($1, $2, $3, $4)",
                    [item.qtde, item.precounit, item.codproduto, codigoVenda]
                );

                // Atualiza a quantidade do produto no estoque
                await Banco.conexao.query(
                    "UPDATE produto SET qtde = qtde - $1 WHERE codigo = $2 AND qtde >= $1",
                    [item.qtde, item.codproduto]
                );
            }

            // Confirma a transação
            await Banco.conexao.query("COMMIT");

            Banco.close();
            return codigoVenda; // Retorna o código da venda
        } catch (erro) {
            await Banco.conexao.query("ROLLBACK"); // Desfaz a transação em caso de erro
            console.log("");
            console.log(
                "=========================================================="
            );
            console.log("ERRO AO SALVAR VENDA", erro);
            console.log(
                "=========================================================="
            );
            console.log("");
        }
    }
};
