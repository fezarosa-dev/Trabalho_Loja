const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

// DAOs e Models
const ClienteDAO = require("./src/controller/ClienteDAO");
const DepartamentoDAO = require("./src/controller/DepartamentoDAO");
const ProdutoDAO = require("./src/controller/ProdutoDAO");
const Cliente = require("./src/model/Cliente");
const Venda = require("./src/model/Cliente");
const VendaDAO = require("./src/controller/VendaDAO");
const ItemDAO = require("./src/controller/ItemDAO");

const app = express();
const porta = 3000;

// Configuração da pasta pública
app.use(express.static(__dirname + "/public"));

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/src/view");

// Configuração de sessão
app.use(
    session({
        secret: "trabalhomuitofacil001",
        resave: true,
        saveUninitialized: true,
    })
);

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
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/login", async function (req, res) {
    const login = req.body.txtLogin;
    const senha = req.body.txtSenha;

    const dao = new ClienteDAO();
    try {
        const cliente = await dao.login(login, senha);
        console.log("Cliente retornado: ", cliente); // Adicione este log
        if (cliente) {
            req.session.usuario = cliente; // Certifique-se de que cliente tenha os dados corretos
            req.session.user = cliente.codigo;
            res.redirect("/menu"); // Redireciona para o menu
        } else {
            req.session.usuario = null;
            res.send("Erro no login/senha");
        }
    } catch (erro) {
        console.log(`Erro no login: ${erro}`);
    }
});

// Rota de menu, com verificação de autenticação
app.get("/menu", async function (req, res) {
    const dao = new DepartamentoDAO();
    const tabela = await dao.listar();
    res.render("departamento", { tabela });
});

// Rota de cadastro
app.post("/cadastro", async (req, res) => {
    const novoCliente = new Cliente();
    const dao = new ClienteDAO();
    const botao = req.body.b1?.trim();

    try {
        if (botao === "Cadastrar") {
            novoCliente.nome = req.body.txtNome;
            novoCliente.login = req.body.txtLogin;
            novoCliente.senha = req.body.txtSenha;

            const codigo = await dao.gravar(novoCliente);
            res.send(
                `Você foi cadastrado com código ${codigo}, bem-vindo! ${novoCliente.login}`
            );
        }
    } catch (erro) {
        console.log(`Erro no cadastro: ${erro}`);
    }
});

// Rota para listar produtos de um departamento específico
app.get("/ListarProdutos/:departamento", async function (req, res) {
    const departamento = req.params.departamento;
    const dao = new ProdutoDAO();
    const tabela = await dao.listar(departamento);
    res.render("produto", { tabela });
});

// Rota para adicionar ao carrinho
/*app.post("/add", verificaAutenticacao, async function (req, res) {
    const usuario = req.session.usuario;
    const carrinho = req.session.carrinho || []; // Verifique se o carrinho existe

    const novoCarrinho = new Carrinho();
    novoCarrinho.codigoProduto = parseInt(req.body.ADDcodigo); // Use o nome correto do campo
    novoCarrinho.qtdeAddProduto = parseInt(req.body.ADDqtde); // Use o nome correto do campo

    // Verifique se os dados são válidos
    if (
        !isNaN(novoCarrinho.codigoProduto) &&
        !isNaN(novoCarrinho.qtdeAddProduto) &&
        novoCarrinho.qtdeAddProduto > 0
    ) {
        // Adicione o novo item ao carrinho
        carrinho.push(novoCarrinho);
        req.session.carrinho = carrinho; // Atualize a sessão

        console.log(
            `Produto adicionado: ${novoCarrinho.codigoProduto}, Quantidade: ${novoCarrinho.qtdeAddProduto}`
        );
        res.send("Produto adicionado ao carrinho com sucesso!"); // Resposta ao cliente
    } else {
        res.send("Dados inválidos!"); // Resposta de erro
    }
});
*/
app.post("/add", verificaAutenticacao, async (req, res) => {
    const codigo = parseInt(req.body.ADDcodigo);
    const quantidade = parseInt(req.body.ADDqtde);
    const prodDAO = new ProdutoDAO();
    const quantidadeProduto = await prodDAO.verificarQTD(codigo);

    // Inicializa o carrinho se não existir
    if (!req.session.carrinho) {
        req.session.carrinho = { produtos: {} };
    }

    // Verifica se o produto já está no carrinho
    if (req.session.carrinho.produtos[codigo]) {
        // Verifica se a quantidade atual + a nova não ultrapassa a quantidade disponível
        if (
            req.session.carrinho.produtos[codigo] + quantidade <=
            quantidadeProduto
        ) {
            req.session.carrinho.produtos[codigo] += quantidade;
        } else {
            return res
                .status(400)
                .send("Quantidade excede o limite disponível.");
        }
    } else {
        // Adiciona o novo produto ao carrinho se a quantidade não ultrapassar o limite
        if (quantidade <= quantidadeProduto) {
            req.session.carrinho.produtos[codigo] = quantidade;
        } else {
            return res
                .status(400)
                .send("Quantidade excede o limite disponível.");
        }
    }

    // Log de informações
    console.log("");
    console.log(`Produto ${codigo} adicionado no carrinho`);
    console.log(`QUANTIDADE ADD: ${quantidade}`);
    console.log(`Quantidade total: ${req.session.carrinho.produtos[codigo]}`);
    console.log("Quantidade disponivel: ", quantidadeProduto);
    console.log(
        "Carrinho completo:",
        JSON.stringify(req.session.carrinho, null, 2)
    );
    console.log("");

    // Responde ao cliente
    res.status(200).send("Produto adicionado ao carrinho com sucesso.");
    console.log("Usuário atual: ", req.session.user);
});

app.post("/carrinho", verificaAutenticacao, async function (req, res) {
    const prodDAO = new ProdutoDAO(); // Instanciando o ProdutoDAO
    const carrinho = req.session.carrinho ? req.session.carrinho.produtos : {};
    const carrinhoEJS = {}; // Para mapear produtos e suas informações
    let totalPreco = 0; // Inicializa totalPreco

    console.log("==========================================================");

    // Percorre os produtos pelo código
    for (const codigo in carrinho) {
        if (carrinho.hasOwnProperty(codigo)) {
            console.log(
                `Produto Código: ${codigo} | Quantidade: ${carrinho[codigo]}`
            );
            const busca = await prodDAO.buscarPorCodigo(codigo);

            // Verifica se o produto foi encontrado
            if (busca) {
                // Adiciona o produto ao carrinhoEJS
                carrinhoEJS[codigo] = busca;
                // Calcula o preço total
                totalPreco += carrinho[codigo] * parseFloat(busca.preco); // Assumindo que busca.preco é um número
            } else {
                console.log(`Produto Código: ${codigo} não encontrado.`);
            }
        }
    }
    req.session.totalPreco = totalPreco;
    console.log("==========================================================");

    // Renderiza a resposta com o carrinho atualizado, incluindo totalPreco
    res.render("carrinho", {
        produtos: carrinhoEJS,
        carrinho: carrinho,
        totalPreco: totalPreco,
    });
});

app.post("/remove", verificaAutenticacao, async function (req, res) {
    const codigoProduto = req.body.codigo; // Obtém o código do produto a ser removido
    const carrinho = req.session.carrinho ? req.session.carrinho.produtos : {};

    // Verifica se o produto está no carrinho
    if (carrinho[codigoProduto]) {
        delete carrinho[codigoProduto]; // Remove o produto do carrinho
        req.session.carrinho.produtos = carrinho; // Atualiza o carrinho na sessão
        console.log(`Produto Código: ${codigoProduto} removido do carrinho.`);
    } else {
        console.log(
            `Produto Código: ${codigoProduto} não encontrado no carrinho.`
        );
    }

    // Chama o método para atualizar a visualização do carrinho
    const prodDAO = new ProdutoDAO(); // Instancia o ProdutoDAO
    const carrinhoEJS = {}; // Objeto para mapear produtos e suas informações
    let totalPreco = 0; // Inicializa a variável de totalPreco

    // Percorre os produtos pelo código para atualizar a visualização
    for (const codigo in carrinho) {
        if (carrinho.hasOwnProperty(codigo)) {
            const busca = await prodDAO.buscarPorCodigo(codigo);
            if (busca) {
                // Verifica se o produto foi encontrado
                carrinhoEJS[codigo] = busca; // Adiciona o produto ao carrinhoEJS
                totalPreco += carrinho[codigo] * parseFloat(busca.preco); // Adiciona o preço ao total
            } else {
                console.log(
                    `Produto com código ${codigo} não encontrado no banco de dados.`
                );
            }
        }
    }
    req.session.totalPreco = totalPreco;

    // Renderiza a resposta com o carrinho atualizado, incluindo a variável carrinho e totalPreco
    res.render("carrinho", {
        produtos: carrinhoEJS,
        carrinho: carrinho,
        totalPreco: totalPreco,
    });
});

app.post("/update", verificaAutenticacao, async function (req, res) {
    const { codigo, quantidade } = req.body; // Captura os dados do corpo da requisição
    const carrinho = req.session.carrinho ? req.session.carrinho.produtos : {};

    // Inicializa totalPreco
    let totalPreco = 0;
    const carrinhoEJS = {}; // Mantendo como objeto para mapear produtos e suas informações

    if (carrinho[codigo]) {
        const prodDAO = new ProdutoDAO();
        const quantidadeProduto = await prodDAO.verificarQTD(codigo); // Verifica a quantidade disponível
        const produto = await prodDAO.buscarPorCodigo(codigo); // Obtém os detalhes do produto

        if (quantidade <= quantidadeProduto) {
            // Atualiza a quantidade do produto no carrinho, se não exceder o limite
            carrinho[codigo] = quantidade;
            req.session.carrinho.produtos = carrinho; // Atualiza o carrinho na sessão
        } else {
            return res
                .status(400)
                .send("Quantidade excede o limite disponível.");
        }
    }

    // Cálculo do preço total dos itens no carrinho
    for (const codigo in carrinho) {
        if (carrinho.hasOwnProperty(codigo)) {
            const busca = await prodDAO.buscarPorCodigo(codigo);
            const quantidadeItem = carrinho[codigo];
            const precoItem = busca.preco; // Assume que o preço está disponível no objeto `busca`
            const quantidadeDisponivel = await prodDAO.verificarQTD(codigo); // Obtém a quantidade disponível

            // Adiciona o produto ao carrinhoEJS
            carrinhoEJS[codigo] = { ...busca, quantidadeDisponivel }; // Adiciona a quantidade disponível

            // Calcula o total do item e soma ao total geral
            totalPreco += quantidadeItem * parseFloat(precoItem);
        }
    }
    req.session.totalPreco = totalPreco;
    // Renderiza a resposta com o carrinho atualizado e o preço total
    res.render("carrinho", { produtos: carrinhoEJS, carrinho, totalPreco }); // Passa totalPreco para o EJS
});
//      FALTA ARRUMAR O FINALIZAR
/*app.post("/finalizar-compra", verificaAutenticacao, async function (req, res) {
    const usuario = req.session.user;
    const venda = new Venda();
    const itens = [];
    const vendaDAO = new VendaDAO();
    venda.total = req.session.totalPreco;
    venda.codCli = usuario.id;
    const codivend = vendaDAO.salvar(venda)
    for (const codigo in req.session.carrinho) {
    }
});

app.get("/sucesso", function (req, res) {
    res.render("sucesso", {
        mensagem: "Compra finalizada com sucesso! Obrigado pela sua compra.",
    });
});
*/
// Inicialização do servidor
app.listen(3000, "0.0.0.0", (erro) => {
    if (erro) {
        console.log("");
        console.log(
            "=========================================================="
        );
        console.log("⚠️  Erro ao iniciar o servidor: " + erro);
        console.log(
            "=========================================================="
        );
        console.log("");
    } else {
        console.log("");
        console.log(
            "=========================================================="
        );
        console.log("✅  Servidor rodando na porta ", porta);
        console.log(
            "=========================================================="
        );
        console.log("");
    }
});
