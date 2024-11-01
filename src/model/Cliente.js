module.exports = class Pessoa {
    #codigo
    #nome
    #login
    #senha
    constructor(){
        this.#codigo = -1
        this.#nome = ""
        this.#login = ""
        this.#senha = ""
    }
    set codigo(x){
        this.#codigo=x
    }
    get codigo(){
        return this.#codigo
    }
    set nome(x){
        this.#nome=x
    }
    get nome(){
        return this.#nome
    }
    set login(x){
        this.#login=x
    }
    get login(){
        return this.#login
    }
    set senha(x){
        this.#senha=x
    }
    get senha(){
        return this.#senha
    }
}