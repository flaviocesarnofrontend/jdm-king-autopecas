const statusServico = document.getElementById("status-servico");
const statusLabel = document.getElementById("status-texto");

selectStatus.addEventListener("change", function () {
    const valor = this.value;

    if (valor === "em-andamento") {
        statusLabel.textContent = "Em andamento";
        statusLabel.style.backgroundColor = "#e6cc00"; // amarelo
    }

    if (valor === "concluido") {
        statusLabel.textContent = "Concluído";
        statusLabel.style.backgroundColor = "#78c257"; // verde
    }

    if (valor === "entregue") {
        statusLabel.textContent = "Entregue";
        statusLabel.style.backgroundColor = "#4a90e2"; // azul
    }
});
