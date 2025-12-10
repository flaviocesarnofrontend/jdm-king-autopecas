export function getClasseStatus(status) {
  switch (status) {
    case "andamento": return "cartao-status-andamento";
    case "concluido": return "cartao-status-concluido";
    case "entregue": return "cartao-status-entregue";
    default: return "cartao-status-andamento";
  }
}

export function formatStatus(status) {
  switch (status) {
    case "andamento": return "Em andamento";
    case "concluido": return "Concluído";
    case "entregue": return "Entregue";
    default: return "Em andamento";
  }
}

export function mostrarToast(mensagem) {
    const toast = document.getElementById("toast-status");
    if (!toast) return;

    toast.innerHTML = 
      `
        <span class="toast-icone">
          <img src="../assets/img/servicos/check-icon.svg" alt="">
        </span>
        <span id="toast-texto">Status atualizado para ${mensagem}</span>
      `;

    toast.style.transform = "translateX(-12px)";
    toast.style.opacity = "1";

    setTimeout(() => {
        toast.style.transform = "translateX(350px)";
        toast.style.opacity = "0";
    }, 2000);
}
