module.exports = class Carrinho {
    #itens; // Array para armazenar os itens do carrinho

    constructor() {
        this.#itens = []; // Inicializa o array de itens
    }

    // Método para adicionar um produto ao carrinho
    adicionarProduto(codigoProduto, qtdeAddProduto, precoProduto) {
        // Verifica se o produto já está no carrinho
        const produtoExistente = this.#itens.find(
            (item) => item.codigoProduto === codigoProduto
        );

        if (produtoExistente) {
            // Se o produto já existe, atualiza a quantidade
            produtoExistente.qtdeAddProduto += qtdeAddProduto;
        } else {
            // Caso contrário, adiciona um novo produto ao carrinho
            this.#itens.push({
                codigoProduto,
                qtdeAddProduto,
                precoProduto,
            });
        }
    }

    // Método para remover um produto do carrinho
    removerProduto(codigoProduto) {
        this.#itens = this.#itens.filter(
            (item) => item.codigoProduto !== codigoProduto
        );
    }

    // Método para obter todos os itens do carrinho
    getItens() {
        return this.#itens;
    }

    // Método para calcular o total do carrinho
    calcularTotal() {
        return this.#itens.reduce((total, item) => {
            return total + item.qtdeAddProduto * item.precoProduto;
        }, 0);
    }
};
