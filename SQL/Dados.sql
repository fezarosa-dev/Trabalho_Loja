-- Inserindo dados na tabela departamento
INSERT INTO departamento (nome)
VALUES ('Eletrônicos'),
    ('Roupas'),
    ('Alimentos'),
    ('Livros');

-- Inserindo dados na tabela cliente
INSERT INTO cliente (nome, login, senha)
VALUES (
        'João Silva',
        'joaosilva',
        'senha123'
    ),
    (
        'Maria Oliveira',
        'mariaoliveira',
        'senha456'
    ),
    (
        'Carlos Santos',
        'carlossantos',
        'senha789'
    ),
    (
        'Felipe Zanoni',
        'fe',
        '12'
    );
-- Inserindo dados na tabela produto
INSERT INTO produto (descricao, preco, qtde, imagem, coddep)
VALUES
    -- Departamento 1 - Eletrônicos
-- Inserindo dados na tabela produto
INSERT INTO produto (descricao, preco, qtde, imagem, coddep)
VALUES
    -- Departamento 1 - Eletrônicos
    ('Smartphone', 1500.00, 10, '1.png', 1),
    ('Fone de Ouvido', 120.00, 30, '2.png', 1),
    ('Câmera Digital', 899.90, 8, '3.png', 1),
    ('Carregador Portátil', 85.00, 45, '4.png', 1),
    ('Fritadeira Elétrica', 120.00, 35, '5.png', 1),
    ('Câmera de Segurança', 199.00, 30, '6.png', 1),
    ('Smartwatch', 299.90, 50, '7.png', 1),
    ('Projetor de Vídeo', 1200.00, 12, '8.png', 1),
    ('TV 4K', 3000.00, 20, '9.png', 1),
    ('Celular à Prova De água', 1800.00, 15, '10.png', 1),

    -- Departamento 2 - Roupas
    ('Camiseta', 49.90, 20, '11.png', 2),
    ('Relógio', 250.00, 25, '12.png', 2),
    ('Tênis Esportivo', 180.00, 40, '13.png', 2),
    ('Jaqueta de Couro', 350.00, 30, '14.png', 2),
    ('Calça Jeans', 120.00, 50, '15.png', 2),
    ('Boné', 40.00, 60, '16.png', 2),

    -- Departamento 3 - Alimentos
    ('Chocolate', 5.50, 100, '17.png', 3),
    ('Café Gourmet', 25.00, 60, '18.png', 3),
    ('Biscoitos', 7.00, 150, '19.png', 3),
    ('Chá Orgânico', 15.00, 80, '20.png', 3),
    ('Suco Natural', 8.00, 120, '21.png', 3),

    -- Departamento 4 - Livros
    ('Livro de Programação', 79.90, 15, '22.png', 4),
    ('Caderno', 10.00, 100, '12.png', 4),
    ('Livro de Filosofia', 45.00, 50, '23.png', 4),
    ('Romance Clássico', 60.00, 35, '24.png', 4),
    ('Biografia de Líderes', 80.00, 25, '25.png', 4);


SELECT *
FROM produto
WHERE coddep = 2;
