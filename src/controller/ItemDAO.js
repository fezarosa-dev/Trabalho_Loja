const Banco = require("../model/Banco")


module.exports = class ItemDAO {

    async criarItem(obj) {
        try {
            const res = await Banco.query(
                'INSERT INTO item(qtde, precounit, codproduto, codvenda) VALUES($1, $2, $3, $4) RETURNING codigo', [obj.qtde, obj.precounit, obj.codproduto, obj.codvenda]);

            return res.rows[0].codigo
        }
        catch (erro) {
            console.log(erro);
        }
    }

    async listarPorCliente(codCli) {
        try {
            const res = await Banco.query(
                `SELECT
                    i.codigo AS item_codigo,
                    i.qtde AS item_qtde,
                    i.precounit AS item_precounit,
                    p.codigo AS produto_codigo,
                    p.descricao AS produto_descricao,
                    p.preco AS produto_preco,
                    p.imagem AS produto_imagem,
                    v.codigo AS venda_codigo,
                    v.total AS venda_total,
                    v.datav AS venda_data,
                    c.nome AS cliente_nome
                FROM
                    item i
                JOIN
                    produto p ON i.codproduto = p.codigo
                JOIN
                    venda v ON i.codvenda = v.codigo
                JOIN
                    cliente c ON v.codcli = c.codigo
                WHERE c.codigo = $1;`, [codCli]);

            return res.rows;
        }
        catch (erro) {
            console.log(erro);
        }
    }
}
