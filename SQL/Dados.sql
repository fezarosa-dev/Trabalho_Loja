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

