// Janela Modal

function openModal() {

    document.getElementById("modalOverlay").style.display = "flex";
    carregarClientes();

    pecasSelecionadas = [];
    totalAtual = 0;
    document.getElementById("valor-total").innerText = "R$ 0,00";
}

function closeModal() {
  document.getElementById("modalOverlay").style.display = "none";
}
