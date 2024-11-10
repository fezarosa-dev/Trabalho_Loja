-- Inserindo dados na tabela departamento
INSERT INTO departamento (nome)
VALUES
    ('Eletrônicos'),
    ('Roupas'),
    ('Alimentos'),
    ('Livros');

-- Inserindo dados na tabela cliente (10 clientes)
INSERT INTO cliente (nome, login, senha)
VALUES
    ('João Silva', 'joaosilva', 'senha123'),
    ('Maria Oliveira', 'mariaoliveira', 'senha456'),
    ('Carlos Santos', 'carlossantos', 'senha789'),
    ('Felipe Zanoni', 'fe', '12'),
    ('Lucas Almeida', 'lucasalmeida', 'senha111'),
    ('Ana Souza', 'anasouza', 'senha222'),
    ('Beatriz Costa', 'beatrizcosta', 'senha333'),
    ('Rafael Lima', 'rafaellima', 'senha444'),
    ('Juliana Martins', 'julianamartins', 'senha555'),
    ('Pedro Gomes', 'pedrogomes', 'senha666');

-- Inserindo dados na tabela produto
INSERT INTO produto (descricao, preco, qtde, imagem, coddep)
VALUES
    -- Departamento 1 - Eletrônicos
    ('Smartphone', 1500.00, 10, 'fig1.jpg', 1),
    ('Fone de Ouvido', 120.00, 30, 'fig2.jpg', 1),
    ('Câmera Digital', 899.90, 8, 'fig3.jpg', 1),
    ('Carregador Portátil', 85.00, 45, 'fig4.jpg', 1),
    ('Fritadeira Elétrica', 120.00, 35, 'fig5.jpg', 1),
    ('Câmera de Segurança', 199.00, 30, 'fig6.jpg', 1),
    ('Smartwatch', 299.90, 50, 'fig7.jpg', 1),
    ('Projetor de Vídeo', 1200.00, 12, 'fig8.jpg', 1),
    ('TV 4K', 3000.00, 20, 'fig9.jpg', 1),
    ('Celular à Prova De água', 1800.00, 15, 'fig10.jpg', 1),

    -- Departamento 2 - Roupas
    ('Camiseta', 49.90, 20, 'fig11.jpg', 2),
    ('Relógio', 250.00, 25, 'fig12.jpg', 2),
    ('Tênis Esportivo', 180.00, 40, 'fig13.jpg', 2),
    ('Jaqueta de Couro', 350.00, 30, 'fig14.jpg', 2),
    ('Calça Jeans', 120.00, 50, 'fig15.jpg', 2),
    ('Boné', 40.00, 60, 'fig16.jpg', 2),

    -- Departamento 3 - Alimentos
    ('Chocolate', 5.50, 100, 'fig17.jpg', 3),
    ('Café Gourmet', 25.00, 60, 'fig18.jpg', 3),
    ('Biscoitos', 7.00, 150, 'fig19.jpg', 3),
    ('Chá Orgânico', 15.00, 80, 'fig20.jpg', 3),
    ('Suco Natural', 8.00, 120, 'fig21.jpg', 3),

    -- Departamento 4 - Livros
    ('Livro de Programação', 79.90, 15, 'fig22.jpg', 4),
    ('Caderno', 10.00, 100, 'fig23.jpg', 4),
    ('Livro de Filosofia', 45.00, 50, 'fig24.jpg', 4),
    ('Romance Clássico', 60.00, 35, 'fig25.jpg', 4),
    ('Biografia de Líderes', 80.00, 25, 'fig26.jpg', 4);
-- Inserindo dados na tabela venda (10 vendas de exemplo)
INSERT INTO venda (total, codcli)
VALUES 
    (1500.00, 1),  -- João Silva
    (250.00, 2),   -- Maria Oliveira
    (899.90, 3),   -- Carlos Santos
    (1200.00, 4),  -- Felipe Zanoni
    (350.00, 5),   -- Lucas Almeida
    (180.00, 6),   -- Ana Souza
    (299.90, 7),   -- Beatriz Costa
    (45.00, 8),    -- Rafael Lima
    (120.00, 9),   -- Juliana Martins
    (200.00, 10);  -- Pedro Gomes

-- Inserindo dados na tabela item (20 itens de exemplo, associando a vendas e produtos)
INSERT INTO item (qtde, precounit, codproduto, codvenda)
VALUES
    -- Venda 1 (João Silva)
    (1, 1500.00, 1, 1), -- Smartphone
    (1, 120.00, 2, 1),  -- Fone de Ouvido

    -- Venda 2 (Maria Oliveira)
    (2, 120.00, 3, 2),  -- Câmera Digital
    (1, 85.00, 4, 2),   -- Carregador Portátil

    -- Venda 3 (Carlos Santos)
    (3, 120.00, 5, 3),  -- Fritadeira Elétrica
    (1, 199.00, 6, 3),  -- Câmera de Segurança

    -- Venda 4 (Felipe Zanoni)
    (2, 299.90, 7, 4),  -- Smartwatch
    (1, 1200.00, 8, 4), -- Projetor de Vídeo

    -- Venda 5 (Lucas Almeida)
    (1, 350.00, 9, 5),  -- TV 4K
    (1, 40.00, 10, 5),  -- Boné

    -- Venda 6 (Ana Souza)
    (2, 49.90, 11, 6),  -- Camiseta
    (1, 250.00, 12, 6), -- Relógio

    -- Venda 7 (Beatriz Costa)
    (3, 180.00, 13, 7),  -- Tênis Esportivo
    (1, 350.00, 14, 7),  -- Jaqueta de Couro

    -- Venda 8 (Rafael Lima)
    (1, 7.00, 15, 8),  -- Biscoitos
    (2, 25.00, 16, 8), -- Café Gourmet

    -- Venda 9 (Juliana Martins)
    (2, 45.00, 17, 9),  -- Livro de Filosofia
    (1, 79.90, 18, 9),  -- Livro de Programação

    -- Venda 10 (Pedro Gomes)
    (3, 60.00, 19, 10), -- Romance Clássico
    (2, 8.00, 20, 10);  -- Suco Natural
