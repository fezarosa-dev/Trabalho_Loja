// Importa pacotes
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const { render } = require('ejs')


// Cria o app
const app = new express()

// Deixa a pasta "public" publica
app.use(express.static(__dirname+"/public"))
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs')
app.set('views', __dirname + "/src/view")

// Usa a sessão
app.use(session({
    secret: 'Trabalho_Loja_NRj#R#unqZ5CM6EL%VYJaG',
    resave: true,
    saveUninitialized: true
}))


// Inicia o Server
const porta = 3000
app.listen(porta, function(erro){
    if(erro){
        console.log('Erro: ' + erro)
    }else(
        console.log('Server iniciado na porta: '+porta)
    )
})

app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html')
})

