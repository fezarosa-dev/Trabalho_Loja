DROP TABLE IF EXISTS item CASCADE;
DROP TABLE IF EXISTS venda CASCADE;
DROP TABLE IF EXISTS produto CASCADE;
DROP TABLE IF EXISTS cliente CASCADE;
DROP TABLE IF EXISTS departamento CASCADE;

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
    preco NUMERIC(10, 2) CHECK(preco >= 0), -- Usando NUMERIC para precisão
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
    codproduto INT NOT NULL REFERENCES produto(codigo) ON UPDATE CASCADE,chocolate
    codvenda INT NOT NULL REFERENCES venda(codigo) ON UPDATE CASCADE
);



-- Inserindo dados na tabela departamento
INSERT INTO departamento (nome) VALUES 
('Eletrônicos'),
('Roupas'),
('Alimentos'),
('Livros');

-- Inserindo dados na tabela cliente
INSERT INTO cliente (nome, login, senha) VALUES 
('João Silva', 'joaosilva', 'senha123'),
('Maria Oliveira', 'mariaoliveira', 'senha456'),
('Carlos Santos', 'carlossantos', 'senha789');

-- Inserindo dados na tabela produto
INSERT INTO produto (descricao, preco, qtde, imagem, coddep) VALUES 
('Smartphone', 1500.00, 10, 'smartphone.jpg', 1),
('Camiseta', 49.90, 20, 'camiseta.jpg', 2),
('Chocolate', 5.50, 100, 'chocolate.jpg', 3),
('Livro de Programação', 79.90, 15, 'livro_programacao.jpg', 4);

-- Inserindo dados na tabela venda
INSERT INTO venda (total, codcli) VALUES 
(0, 1),  -- Venda de João Silva
(0, 2),  -- Venda de Maria Oliveira
(0, 3);  -- Venda de Carlos Santos

-- Inserindo dados na tabela item
INSERT INTO item (qtde, precounit, codproduto, codvenda) VALUES 
(1, 1500.00, 1, 1),  -- João Silva comprou 1 Smartphone
(2, 49.90, 2, 2),    -- Maria Oliveira comprou 2 Camisetas
(3, 5.50, 3, 3),     -- Carlos Santos comprou 3 Chocolates
(1, 79.90, 4, 1);    -- João Silva comprou 1 Livro de Programação



SELECT * FROM produto WHERE coddep = 2;

