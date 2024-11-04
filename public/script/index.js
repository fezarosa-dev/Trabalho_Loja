// Inicializa o título padrão
document.title = "Loja de Itens variados";

// Função que altera o título a cada 2 segundos
const trocarTitulo = setInterval(function() {
  if (document.visibilityState === 'visible') {
    // Alterna entre os títulos apenas quando a aba está visível
    document.title = document.title === "Loja de Itens variados" ? "COMPRE AQUI" : "Loja de Itens variados";
  }
}, 2000);

// Função que altera o título quando a aba perde foco
document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === 'hidden') {
    document.title = "Volte aqui";
  }
});
