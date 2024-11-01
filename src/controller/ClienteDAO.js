const Banco = require("../model/Banco")
const Cliente = require("../model/Cliente")

//DAO -> Data Acess Object
module.exports = class clienteDAO {
    // Gravando Dados
    async gravar(obj) {
        try {
            Banco.init()
            const res = await Banco.conexao.query("INSERT INTO cliente(nome, login, senha) values($1, $2, $3) RETURNING codigo", [obj.nome, obj.login, obj.senha])
            Banco.conexao.end()
            return res.rows[0].codigo
        }
        catch (erro) {
            console.log(erro)
        }
    }

    async login(vlogin, vsenha) {
        try {
            let obj =  null
            Banco.init()
            let tabela = await Banco.conexao.query("SELECT * FROM cliente where login = $1 and senha = $2", [vlogin, vsenha])
            Banco.conexao.end()
            if ((tabela != null) && (tabela.rowCount > 0)) {
                obj = new Cliente()
                obj.codigo = tabela.rows[0].codigo
                obj.nome = tabela.rows[0].nome
                obj.login = tabela.rows[0].login      
            }
            return obj
        }
        catch (erro) {
            console.log(erro)
        }
    }
}