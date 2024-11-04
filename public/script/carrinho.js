function verificar() {
    const total = document.getElementById('totalprecooo');
    const botao = document.getElementById('botao')
    if (total.innerText === "0.00") { // use innerText para comparar o valor do elemento
        botao.style.display = 'none'; // use display para esconder o elemento
    }
}
