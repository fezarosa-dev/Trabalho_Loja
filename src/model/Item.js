module.exports = class Item {
    #codigo;
    #qtde;
    #precounit;
    #codproduto;
    #codvenda;

    constructor() {
        this.#codigo = 0;
        this.#qtde = 0;
        this.#precounit = 0.0;
        this.#codproduto = 0;
        this.#codvenda = 0;
    }

    set codigo(c) {
        this.#codigo = c;
    }
    get codigo() {
        return this.#codigo;
    }

    set qtde(q) {
        this.#qtde = q;
    }
    get qtde() {
        return this.#qtde;
    }

    set precounit(p) {
        this.#precounit = p;
    }
    get precounit() {
        return this.#precounit;
    }

    set codproduto(cp) {
        this.#codproduto = cp;
    }
    get codproduto() {
        return this.#codproduto;
    }

    set codvenda(cv) {
        this.#codvenda = cv;
    }
    get codvenda() {
        return this.#codvenda;
    }
};
