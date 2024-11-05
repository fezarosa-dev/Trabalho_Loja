DROP TABLE IF EXISTS item CASCADE;


DROP TABLE IF EXISTS venda CASCADE;


DROP TABLE IF EXISTS produto CASCADE;


DROP TABLE IF EXISTS cliente CASCADE;


DROP TABLE IF EXISTS departamento CASCADE;


CREATE TABLE cliente ( codigo SERIAL PRIMARY KEY,
                                             nome VARCHAR(50) NOT NULL,
                                                              login VARCHAR(50) UNIQUE NOT NULL,
                                                                                       senha CHAR(32) NOT NULL);


CREATE TABLE departamento ( codigo SERIAL PRIMARY KEY,
                                                  nome VARCHAR(50) NOT NULL);


CREATE TABLE produto
    ( codigo SERIAL PRIMARY KEY,
                            descricao VARCHAR(50) NOT NULL,
                                                  preco NUMERIC(10, 2) CHECK(preco >= 0),
                                                                       qtde INT CHECK(qtde >= 0),
                                                                                imagem VARCHAR(100),
                                                                                       coddep INT NOT NULL REFERENCES departamento(codigo) ON UPDATE CASCADE ON DELETE
     SET NULL);


CREATE TABLE venda
    ( codigo SERIAL PRIMARY KEY,
                            total NUMERIC(10, 2) DEFAULT 0 CHECK(total >= 0),
                                                           datav TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                                                                   codcli INT NOT NULL REFERENCES cliente(codigo) ON UPDATE CASCADE);


CREATE TABLE item
    ( codigo SERIAL PRIMARY KEY,
                            qtde INT CHECK(qtde > 0),
                                     precounit NUMERIC(10, 2) CHECK(precounit >= 0),
                                                              codproduto INT NOT NULL REFERENCES produto(codigo) ON UPDATE CASCADE,
                                                                                                                           codvenda INT NOT NULL REFERENCES venda(codigo) ON UPDATE CASCADE);
