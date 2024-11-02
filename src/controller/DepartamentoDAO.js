const Banco = require("../model/Banco")

//DAO -> Data Acess Object
module.exports = class DepartamentoDAO {
    // Listando Dados
    async listar() {
        try {
            Banco.init()
            let tabela = await Banco.conexao.query("SELECT codigo, nome FROM departamento order by 2")
            Banco.close()
            return tabela
        }
        catch (erro) {
            console.log(erro)
        }
    }
}
