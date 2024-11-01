const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

// DAO
const ClienteDAO = require("./src/controller/ClienteDAO")
const DepartamentoDAO = require('./src/controller/DepartamentoDAO')
const ProdutoDAO = require('./src/controller/ProdutoDAO')
const Carrinho = require('./src/model/Carrinho')



const app = new express()
//public é a pasta com conteúdo público
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set("views", __dirname + "\\src\\view");

app.use(session({
    secret: 'trabalhomuitofacil',
    resave: true,
    saveUninitialized:true
}));

app.get('/', function (req, res) {
    res.sendFile(__dirname+"/index.html")
})

app.post('/login', async function (req, res) {
    let login = req.body.txtLogin
    let senha = req.body.txtSenha

    let dao = new ClienteDAO()
    let cliente = null
    try {
        cliente = await dao.login(login, senha)
        if (cliente != null) {
            session.usuario = cliente
            res.send(login + " logado com sucesso")
        }
        else {
            session.usuario = null
            res.send("Erro no login/senha")
        }
    }
    catch (erro) {
        console.log(`Deu erro aqui -> ${erro}`)
    }
})

app.get('/menu', async function (req, res) {
    let dao = new DepartamentoDAO()
    let tabela = await dao.listar()
    res.render('departamento', { tabela })

})

app.post('/cadastro', async function (req, res) {
    let logar = new Cliente()
    let dao = new ClienteDAO()
    let botao = String(req.body.b1).trim()
    try {
        if (botao.localeCompare("Logar") == 0) {
            logar.nome = String(req.body.txtNome)
            logar.login = String(req.body.txtLogin)
            logar.senha = String(req.body.txtSenha)

            let codigo = await dao.gravar(logar)
            res.send(`Você foi cadastrado com código ${codigo}, bem-vindo! ${logar.login}`)
        }
    }
    catch (erro) {
        console.log(`Deu erro aqui ;( -> ${erro}`)
    }
})

app.get('/ListarProdutos/:departamento', async function(req, res) {
    // Obtendo o número do departamento a partir dos parâmetros de rota
    const departamento = req.params.departamento;
    let dao = new ProdutoDAO()
    let tabela= await dao.listar(departamento)
    // Resposta com o número do departamento

    res.render('produto', {tabela})
});


app.post('/add', async function(req, res) {
    let login = session.usuario;
    let add = new Carrinho()
    add.codigoProduto = req.body.Addcodigo
    add.qtdeAddProduto = req.body.Addqtde
    add.precoProduto = req.body.AddPreco
    session.carrinho = add
    console.log({
        codigoProduto: session.carrinho.codigoProduto,
        qtdeAddProduto: session.carrinho.qtdeAddProduto,
        precoProduto: session.carrinho.precoProduto
    });
    if (login) {
        res.send('ok');
    } else {
        res.send(`
            <html>
                <body>
                    <script>
                        alert('Você precisa estar logado para acessar esta funcionalidade.');
                        window.location.href = '/template/login.html'; // Redireciona para a página de login
                    </script>
                </body>
            </html>
        `);
    }
});


app.listen(3000, function (erro) {
    if (erro) {
        console.log(" Erro no servidor : "+ erro)
    }
    else {
        console.log("Servidor rodando na porta 3000")
    }
})


