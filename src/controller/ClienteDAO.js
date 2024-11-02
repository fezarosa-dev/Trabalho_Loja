const Banco = require("../model/Banco")
const Cliente = require("../model/Cliente")

// DAO -> Data Access Object
module.exports = class ClienteDAO {
    // Gravando Dados
    async gravar(obj) {
        try {
            Banco.init()
            const res = await Banco.conexao.query(
                "INSERT INTO cliente(nome, login, senha) VALUES($1, $2, $3) RETURNING codigo",
                [obj.nome, obj.login, obj.senha]
            )
            return res.rows[0].codigo
        } catch (erro) {
            console.log("Erro ao gravar cliente:", erro)
            throw erro
        } finally {
            Banco.close()
        }
    }

    async login(vlogin, vsenha) {
        try {
            Banco.init()
            const res = await Banco.conexao.query(
                "SELECT * FROM cliente WHERE login = $1 AND senha = $2",
                [vlogin, vsenha]
            )
            if (res.rowCount > 0) {
                const row = res.rows[0]
                const obj = new Cliente()
                obj.codigo = row.codigo
                obj.nome = row.nome
                obj.login = row.login
                return obj
            }
            return null
        } catch (erro) {
            console.log("Erro ao realizar login:", erro)
            throw erro
        } finally {
            Banco.close()
        }
    }
}
