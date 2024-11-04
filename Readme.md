# Trabalho_Loja

Este projeto é uma loja online desenvolvida em Node.js, HTML, CSS e PostgreSQL. O sistema permite que os usuários naveguem por diferentes departamentos de produtos, adicionem itens ao carrinho de compras e finalizem a compra.

## Funcionalidades
- Exibição de departamentos de produtos em um iframe.
- Visualização de produtos dentro de um iframe que muda conforme o departamento selecionado.
- Adição de produtos ao carrinho de compras com controle de quantidade.
- Cálculo do total do carrinho e exibição em tempo real.
- Opção de login para finalizar a compra.
- Estrutura MVC (Model-View-Controller).

## Tecnologias Utilizadas
- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express.js**: Framework para facilitar a criação de servidores web.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **HTML/CSS**: Linguagens de marcação e estilo para a construção da interface.

## Instalação
1. **Clone o repositório**:
   ```bash
   git clone https://github.com/fezarosa-dev/Trabalho_Loja.git
   cd Trabalho_Loja
   ```
2. **Instale as dependências**:
   ```bash
   npm install
   ```
3. **Configuração do Banco de Dados**:
   - Crie um banco de dados PostgreSQL chamado `node`.
   - Configure as informações nessesarias no arquivo [loginBD.sql](/SQL/loginBG.json) que esta na pasta SQL
   - Execute os seguintes comandos SQL para criar as tabelas necessárias:
   ```sql
   CREATE TABLE cliente (
       codigo serial PRIMARY KEY,
       nome varchar(50),
       login varchar(50) UNIQUE,
       senha char(32)
   );
   CREATE TABLE departamento (
       codigo serial PRIMARY KEY,
       nome varchar(50)
   );
   CREATE TABLE produto (
       codigo serial PRIMARY KEY,
       descricao varchar(50),
       preco float,
       qtde int CHECK (qtde >= 0),
       imagem varchar(100),
       coddep int NOT NULL REFERENCES departamento(codigo) ON UPDATE CASCADE
   );
   CREATE TABLE venda (
       codigo serial PRIMARY KEY,
       total float DEFAULT 0,
       datav timestamp DEFAULT current_timestamp,
       codcli int NOT NULL REFERENCES cliente(codigo) ON UPDATE CASCADE
   );
   CREATE TABLE item (
       codigo serial PRIMARY KEY,
       qtde int CHECK (qtde > 0),
       precounit float,
       codproduto int NOT NULL REFERENCES produto(codigo) ON UPDATE CASCADE,
       codvenda int NOT NULL REFERENCES venda(codigo) ON UPDATE CASCADE
   );
   ```
4. **Inicie o servidor**:
   ```bash
   npm start 
   ```
6. **Acesse a aplicação**:
   Abra o navegador e acesse `http://localhost:3000`.

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir um **pull request** ou relatar problemas.

## Licença
Este projeto é licenciado sob a [Apache License](LICENSE).

