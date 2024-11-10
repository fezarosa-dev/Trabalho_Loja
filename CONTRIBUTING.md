# Contribuindo para o Projeto de Loja Online

Obrigado por considerar contribuir para o nosso projeto de Loja Online! Nós valorizamos e incentivamos as contribuições da comunidade para ajudar a melhorar a experiência dos usuários. Este guia descreve o processo para contribuir.

## Como Começar

1. **Clone o repositório**: Antes de começar, clone o repositório localmente.
   ```bash
   git clone https://github.com/fezarosa-dev/Trabalho_Loja.git
   ```

2. **Instale as dependências**: Depois de clonar, execute o seguinte comando na raiz do projeto para instalar as dependências:
   ```bash
   npm install
   ```

3. **Configure o ambiente**: Verifique se você configurou corretamente o banco de dados PostgreSQL ou MySQL. O arquivo `Banco.js` na pasta `src/model` contém a configuração de conexão, e você deve ajustar as informações de acesso ao banco de dados (host, usuário, senha e nome do banco).

4. **Execute o projeto**: Para iniciar o servidor, use o comando:
   ```bash
   npm start
   ```

## Fluxo de Trabalho

1. **Crie uma branch**: Para cada nova funcionalidade ou correção de bug, crie uma nova branch a partir da branch `main`.
   ```bash
   git checkout -b nome-da-feature
   ```

2. **Faça commits claros e concisos**: Escreva mensagens de commit descritivas para explicar as alterações feitas.
   
3. **Garanta que o código está funcionando**: Antes de enviar uma solicitação de pull, certifique-se de que o código está funcional e de que todas as dependências necessárias estão documentadas.

4. **Envie uma Pull Request (PR)**: Envie sua PR para o repositório principal e descreva brevemente as mudanças. Certifique-se de linkar qualquer issue relacionada.

## Padrões de Código

- Utilize a arquitetura **MVC**.
- Organize suas rotas conforme a estrutura padrão do projeto:
  - Todas as rotas devem ser configuradas no arquivo `server.js`.
  - Utilize a pasta `src/controller` para a logica de classes.

## Requisitos de Formatação

- Siga o padrão de formatação e estilo já estabelecido no código.
- Evite blocos `finally` desnecessários.
- Adicione logs `console.log` estilizados para feedback claro durante o desenvolvimento.
- Evite o uso de JSON no código, optando por estruturas mais diretas e simplificadas.

## Testes

Contribuições com testes são muito bem-vindas! Inclua testes automatizados para novas funcionalidades e certifique-se de que os testes existentes não falhem com suas modificações.

## Problemas e Sugestões

Caso encontre algum problema, abra uma issue descrevendo-o detalhadamente. Para sugestões de melhorias, abra uma issue de tipo "enhancement".

---

Muito obrigado pela sua contribuição!
