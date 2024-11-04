module.exports = class Venda {
    #total
    #datav
    #codCli

    constructor() {
        this.#total = 0 // Total da venda
        this.#datav = new Date() // Data e hora da venda (atual)
        this.#codCli = -1 // ID do cliente
    }

    // Getters e Setters com validações

    set total(x) {
        if (typeof x === 'number' && x >= 0) {
            this.#total = x
        } else {
            throw new Error("Total inválido.")
        }
    }

    get total() {
        return this.#total
    }

    get data() {
        return this.getDataFormatada()
    }

    set codCli(x) {
        if (typeof x === 'number' && x >= 0) {
            this.#codCli = x
        } else {
            throw new Error("ID do cliente inválido.")
        }
    }

    get codCli() {
        return this.#codCli
    }

    // Método para formatar a data/hora para uma string legível
    getDataFormatada() {
        return this.#datav.toLocaleString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    // Método para representar a venda como uma string
    toString() {
        return `Cliente: ${this.#codCli}, Total: R$ ${this.#total.toFixed(2)}, Data: ${this.getDataFormatada()}`;
    }
}
