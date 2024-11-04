const Banco = require("../model/Banco");

module.exports = class VendaDAO {
    async salvar(venda) {
        try {
            Banco.init();
            const resultado = await Banco.conexao.query(
                "INSERT INTO venda (codcli, total, datav) VALUES ($1, $2, $3) RETURNING codigo",
                [venda.codcli, venda.total, venda.data]
            );
            Banco.close();
            return resultado.rows[0].codigo; // Retorna o código da venda inserida
        } catch (erro) {
            console.log("");
            console.log("==========================================================");
            console.log("ERRO AO SALVAR VENDA", erro);
            console.log("==========================================================");
            console.log("");
        }
    }
};
