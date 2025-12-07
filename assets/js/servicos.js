const statusServico = document.getElementById("status-servico");
const toast = document.getElementById("toast-status");
const toastTexto = document.getElementById("toast-texto");

// O span que deve ser atualizado
const cartaoStatus = document.querySelector(".cartao-status-andamento, .cartao-status-execucao, .cartao-status-entregue");

statusServico.addEventListener("change", function () {
    const valor = this.value;

    let mensagem = "";
    let novaClasse = "";
    let novoTexto = "";

    if (valor === "andamento") {
        mensagem = "Status atualizado para Em andamento";
        novaClasse = "cartao-status-andamento";
        novoTexto = "Em andamento";
    }

    if (valor === "concluido") {
        mensagem = "Status atualizado para Concluído";
        novaClasse = "cartao-status-concluido";
        novoTexto = "Concluído";
    }

    if (valor === "entregue") {
        mensagem = "Status atualizado para Entregue";
        novaClasse = "cartao-status-entregue";
        novoTexto = "Entregue";
    }

    // 🔄 Atualiza o texto do span
    cartaoStatus.textContent = novoTexto;

    // 🔄 Remove classes antigas e adiciona a nova
    cartaoStatus.classList.remove(
        "cartao-status-andamento",
        "cartao-status-concluido",
        "cartao-status-entregue"
    );
    cartaoStatus.classList.add(novaClasse);

    // Toast
    toastTexto.textContent = mensagem;

    const largura = window.innerWidth;
    const deslocamentoX = largura > 800 ? "-20px" : "-12px";

    toast.style.opacity = "1";
    toast.style.transform = `translateX(${deslocamentoX}) translateY(0)`;

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(350px) translateY(0px)";
    }, 3000);
});

// Janela Modal

function openModal() {
  document.getElementById("modalOverlay").style.display = "flex";
}

function closeModal() {
  document.getElementById("modalOverlay").style.display = "none";
}