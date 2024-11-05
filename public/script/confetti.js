// Função para criar um confete animado
function createConfetti() {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    // Define propriedades aleatórias para o confete
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = Math.random() * 10 + 10 + "s"; // Entre 2 e 5 segundos
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Cores aleatórias

    document.body.appendChild(confetti);

    // Remove o confete após a animação
    confetti.addEventListener("animationend", () => {
        confetti.remove();
    });
}

// Função para lançar vários confetes
function launchConfetti() {
    for (let i = 0; i < 100; i++) {
        setTimeout(createConfetti, i * 30); // Espaçamento entre os confetes
    }
}

// Chame a função quando a página carregar
window.onload = launchConfetti;
