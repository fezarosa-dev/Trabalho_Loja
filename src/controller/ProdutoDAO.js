const Banco = require("../model/Banco")

//DAO -> Data Acess Object
module.exports = class ProdutoDAO {
    // Listando Dados
async listar(dep) {
    let departamento = dep;
    try {
        Banco.init();
        let tabela = await Banco.conexao.query("SELECT codigo, descricao, preco, qtde, imagem FROM produto WHERE coddep = $1", [departamento]); // Adicionei "FROM produto"
        Banco.close()
        return tabela;
    } catch (erro) {
        console.log(erro);
    }
}

}
