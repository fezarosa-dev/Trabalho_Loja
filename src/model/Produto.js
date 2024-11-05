module.exports = class Produto {
    #codigo;
    #descricao;
    #preco;
    #qtde;
    #imagem;
    #coddep;

    constructor() {
        this.#codigo = -1;
        this.#descricao = "";
        this.#preco = 0.0;
        this.#qtde = 0;
        this.#imagem = "";
        this.#coddep = -1;
    }

    // Getters
    get codigo() {
        return this.#codigo;
    }

    get descricao() {
        return this.#descricao;
    }

    get preco() {
        return this.#preco;
    }

    get qtde() {
        return this.#qtde;
    }

    get imagem() {
        return this.#imagem;
    }

    get coddep() {
        return this.#coddep;
    }
};
