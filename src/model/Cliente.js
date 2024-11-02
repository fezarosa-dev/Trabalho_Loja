module.exports = class Cliente {
    #codigo
    #nome
    #login
    #senha

    constructor() {
        this.#codigo = -1
        this.#nome = ""
        this.#login = ""
        this.#senha = ""
    }

    // Getters e Setters com validações
    set codigo(x) {
        if (typeof x === 'number' && x >= 0) {
            this.#codigo = x
        } else {
            throw new Error("Código inválido.")
        }
    }

    get codigo() {
        return this.#codigo
    }

    set nome(x) {
        if (typeof x === 'string' && x.trim() !== '') {
            this.#nome = x.trim()
        } else {
            throw new Error("Nome inválido.")
        }
    }

    get nome() {
        return this.#nome
    }

    set login(x) {
        if (typeof x === 'string' && x.trim() !== '') {
            this.#login = x.trim()
        } else {
            throw new Error("Login inválido.")
        }
    }

    get login() {
        return this.#login
    }

    set senha(x) {
        if (typeof x === 'string' && x.trim() !== '') {
            this.#senha = x
        } else {
            throw new Error("Senha inválida.")
        }
    }

    get senha() {
        return this.#senha
    }
}
