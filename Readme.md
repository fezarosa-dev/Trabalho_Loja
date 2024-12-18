# Integrantes:
1. **Felipe Zanoni da Rosa**
2. **Otavio Silva Souza**

# Trabalho_Loja

Este projeto é uma loja online desenvolvida em Node.js, HTML, CSS e PostgreSQL. O sistema permite que os usuários naveguem por diferentes departamentos de produtos, adicionem itens ao carrinho de compras e finalizem a compra.

## Funcionalidades

-   Exibição de departamentos de produtos em um iframe.
-   Visualização de produtos dentro de um iframe que muda conforme o departamento selecionado.
-   Adição de produtos ao carrinho de compras com controle de quantidade.
-   Cálculo do total do carrinho e exibição em tempo real.
-   Opção de login para finalizar a compra.
-   Estrutura MVC (Model-View-Controller).

## Tecnologias Utilizadas

-   **Node.js**: Ambiente de execução JavaScript no servidor.
-   **Express.js**: Framework para facilitar a criação de servidores web.
-   **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
-   **HTML/CSS**: Linguagens de marcação e estilo para a construção da interface.

## Instalação

1.  **Clone o repositório e instale as dependencias**:
    ```bash
     color 2
     git clone https://github.com/fezarosa-dev/Trabalho_Loja.git
     cd Trabalho_Loja
     npm install
     cls
     echo Seu projeto foi instalado com sucesso
     pause
     
    ```
2.  **Configuração do Banco de Dados**: Crie um banco de dados PostgreSQL chamado **node**.
3. **Configure as informações nessesarias no arquivo [Banco.js](/src/model/Banco.js) que esta na pasta src/model**
4. **Execute os seguintes comandos [SQL](/SQL/criar_tabelas.sql) para criar as tabelas necessárias:**
    ```sql
    CREATE TABLE cliente (
        codigo SERIAL PRIMARY KEY,
        nome VARCHAR(50) NOT NULL,
        login VARCHAR(50) UNIQUE NOT NULL,
        senha CHAR(32) NOT NULL
    );
    CREATE TABLE departamento (
        codigo SERIAL PRIMARY KEY,
        nome VARCHAR(50) NOT NULL
    );
    CREATE TABLE produto (
        codigo SERIAL PRIMARY KEY,
        descricao VARCHAR(50) NOT NULL,
        preco NUMERIC(10, 2) CHECK(preco >= 0),
        qtde INT CHECK(qtde >= 0),
        imagem VARCHAR(100),
        coddep INT NOT NULL REFERENCES departamento(codigo) ON UPDATE CASCADE ON DELETE SET NULL
    );
    CREATE TABLE venda (
        codigo SERIAL PRIMARY KEY,
        total NUMERIC(10, 2) DEFAULT 0 CHECK(total >= 0),
        datav TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        codcli INT NOT NULL REFERENCES cliente(codigo) ON UPDATE CASCADE
    );
    CREATE TABLE item (
        codigo SERIAL PRIMARY KEY,
        qtde INT CHECK(qtde > 0),
        precounit NUMERIC(10, 2) CHECK(precounit >= 0),
        codproduto INT NOT NULL REFERENCES produto(codigo) ON UPDATE CASCADE,
        codvenda INT NOT NULL REFERENCES venda(codigo) ON UPDATE CASCADE
    );

        ```

5.  **Adicione produtos e departamento no [Banco de Dados ](/SQL/adicionar_dados.sql)**
6.  **Inicie o servidor**:
    ```bash
    npm start
    ```
7.  **Acesse a aplicação**:
    Abra o navegador e digite http://localhost:3000 na barra de endereços.
    Para acessar a página a partir de outro computador na mesma rede, abra o navegador nesse PC e insira https://ipDoPcHost:3000, substituindo ipDoPcHost pelo endereço IP do computador que está hospedando a aplicação.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um **pull request** ou relatar problemas.

## Licença

Este projeto é licenciado sob a [Apache License](LICENSE).
