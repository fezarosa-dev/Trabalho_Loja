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
('Carlos Santos', 'carlossantos', 'senha789'),
('Felipe Zanoni', 'fe', '12');

-- Inserindo dados na tabela produto
INSERT INTO produto (descricao, preco, qtde, imagem, coddep) VALUES
('Smartphone', 1500.00, 10, 'smartphone.jpg', 1),
('Camiseta', 49.90, 20, 'camiseta.jpg', 2),
('Chocolate', 5.50, 100, 'chocolate.jpg', 3),
('Livro de Programação', 79.90, 15, 'livro_programacao.jpg', 4);


SELECT * FROM produto WHERE coddep = 2;

