### Changelog

#### Versão 1.0.0 - Inicial (01/10/2024)
- Estrutura inicial do projeto com a configuração do servidor Express e a configuração do EJS como motor de visualização.
- Criação das rotas de autenticação (`/login`) e rota inicial (`/`).
- Implementação de DAOs para Cliente, Departamento e Produto.
- Adição da rota de cadastro (`/cadastro`) para clientes, com verificação de dados.

#### Versão 1.1.0 - Carrinho de Compras e Sessões (10/10/2024)
- Adição do gerenciamento de sessões usando `express-session`.
- Implementação da lógica de carrinho de compras, incluindo a criação da rota `/add` para adicionar produtos ao carrinho.
- Criação da função `verificaAutenticacao` para proteger rotas que requerem autenticação.

#### Versão 1.2.0 - Listagem de Produtos (18/10/2024)
- Rota `/ListarProdutos/:departamento` adicionada para exibir produtos por departamento.
- Criação do template `produto.ejs` para listar os produtos disponíveis.

#### Versão 1.3.0 - Controle Avançado do Carrinho (25/10/2024)
- Atualização da lógica de adição ao carrinho na rota `/add`, garantindo que a quantidade de produto adicionada não exceda o estoque disponível.
- Melhorias na estrutura do carrinho de compras, convertendo-o para um objeto com chave de produto e quantidade.
- Criação de logs de console para depuração e monitoramento do fluxo de adição ao carrinho.

#### Versão 1.4.0 - Remoção e Atualização de Produtos no Carrinho (02/11/2024)
- Implementação da rota `/remove` para permitir a remoção de produtos do carrinho.
- Criação da rota `/update` para atualizar a quantidade de itens no carrinho, com verificação de estoque disponível.
- Ajustes na lógica de cálculo do preço total do carrinho e integração do valor total ao template `carrinho.ejs`.

#### Versão 1.5.0 - Renderização de Templates e Otimização do Código (06/11/2024)
- Refatoração das funções de atualização e renderização do carrinho para otimizar o código e corrigir inconsistências de cálculo.
- Implementação da renderização condicional no `carrinho.ejs`, garantindo que produtos fora de estoque não sejam exibidos na listagem.
- Ajustes nas mensagens de erro e sucesso, com respostas mais informativas para o usuário final.

#### Próximas Atualizações
- Otimizações para melhorar a segurança das rotas e a consistência dos dados de sessão.
- Implementação de testes unitários para validação das funções críticas de manipulação de dados e autenticação.
