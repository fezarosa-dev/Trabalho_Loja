const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

// DAOs e Models
const ClienteDAO = require("./src/controller/ClienteDAO");
const DepartamentoDAO = require('./src/controller/DepartamentoDAO');
const ProdutoDAO = require('./src/controller/ProdutoDAO');
const Carrinho = require('./src/model/Carrinho');
const Cliente = require('./src/model/Cliente');

const app = express();

// Configuração da pasta pública
app.use(express.static(__dirname + '/public'));

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do view engine
app.set('view engine', 'ejs');
app.set("views", __dirname + "/src/view");

// Configuração de sessão
app.use(session({
    secret: 'trabalhomuitofacil',
    resave: true,
    saveUninitialized: true
}));

// Função de middleware para verificação de autenticação
function verificaAutenticacao(req, res, next) {
    if (req.session.usuario) {
        next();
    } else {
        res.send(`
            <html>
                <body>
                    <script>
                        alert('Você precisa estar logado para acessar esta funcionalidade.');
                        window.location.href = 'template/login.html';
                    </script>
                </body>
            </html>
        `);
    }
}

// Rota inicial
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Rota de login
app.post('/login', async function(req, res) {
    const login = req.body.txtLogin;
    const senha = req.body.txtSenha;

    const dao = new ClienteDAO();
    try {
        const cliente = await dao.login(login, senha);
        if (cliente) {
            req.session.usuario = cliente;
            res.redirect('/menu'); // Redireciona para o menu
        } else {
            req.session.usuario = null;
            res.send("Erro no login/senha");
        }
    } catch (erro) {
        console.log(`Erro no login: ${erro}`);
    }
});

// Rota de menu, com verificação de autenticação
app.get('/menu', async function(req, res) {
    const dao = new DepartamentoDAO();
    const tabela = await dao.listar();
    res.render('departamento', { tabela });
});

// Rota de cadastro
app.post('/cadastro', async (req, res) => {
    const novoCliente = new Cliente();
    const dao = new ClienteDAO();
    const botao = req.body.b1?.trim();

    try {
        if (botao === "Cadastrar") {
            novoCliente.nome = req.body.txtNome;
            novoCliente.login = req.body.txtLogin;
            novoCliente.senha = req.body.txtSenha;

            const codigo = await dao.gravar(novoCliente);
            res.send(`Você foi cadastrado com código ${codigo}, bem-vindo! ${novoCliente.login}`);
        }
    } catch (erro) {
        console.log(`Erro no cadastro: ${erro}`);
    }
});

// Rota para listar produtos de um departamento específico
app.get('/ListarProdutos/:departamento', async function(req, res) {
    const departamento = req.params.departamento;
    const dao = new ProdutoDAO();
    const tabela = await dao.listar(departamento);
    res.render('produto', { tabela });
});

// Rota para adicionar ao carrinho
app.post('/add', verificaAutenticacao, async function(req, res) {
    const usuario = req.session.usuario;

    const carrinho = req.session.carrinho || []; // Mantém o carrinho existente
    const novoProduto = new Carrinho();
    novoProduto.codigoProduto = req.body.Addcodigo;
    novoProduto.qtdeAddProduto = req.body.Addqtde;
    novoProduto.precoProduto = req.body.AddPreco;

    // Adiciona o novo produto ao carrinho
    carrinho.push(novoProduto);
    req.session.carrinho = carrinho;

    console.log({
        codigoProduto: novoProduto.codigoProduto,
        qtdeAddProduto: novoProduto.qtdeAddProduto,
        precoProduto: novoProduto.precoProduto
    });

    res.send('Produto adicionado ao carrinho com sucesso!');
});

// Rota para remover produto do carrinho
app.post('/carrinho/remover', verificaAutenticacao, (req, res) => {
    const codigoProduto = req.body.codigoProduto;
    let carrinho = req.session.carrinho || [];

    req.session.carrinho = carrinho.filter(item => item.codigoProduto !== codigoProduto);
    res.redirect('/carrinho');
});

// Rota para atualizar quantidade do produto no carrinho
app.post('/carrinho/atualizar', verificaAutenticacao, (req, res) => {
    const { codigoProduto, novaQuantidade } = req.body;
    const carrinho = req.session.carrinho || [];

    carrinho.forEach(item => {
        if (item.codigoProduto === codigoProduto) {
            item.qtdeAddProduto = novaQuantidade;
        }
    });

    req.session.carrinho = carrinho;
    res.redirect('/carrinho');
});

// Rota para exibir o carrinho
app.post('/carrinho', verificaAutenticacao, (req, res) => {
    const carrinho = req.session.carrinho || [];
    res.render('carrinho', { carrinho });
});

// Inicialização do servidor
app.listen(3000, (erro) => {
    if (erro) {
        console.log("Erro ao iniciar o servidor: " + erro);
    } else {
        console.log("Servidor rodando na porta 3000");
    }
});
