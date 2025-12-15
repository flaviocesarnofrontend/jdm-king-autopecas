// modules/modal.js
import { carregarClientes } from "./clientes.js";
import { resetPecas } from "./pecas.js";

export function openModal() {
  document.body.classList.remove("modal-close");
  document.body.classList.add("modal-open");
  const overlay = document.getElementById("modalOverlay");
  overlay.style.display = "flex";

  carregarClientes();

  // ocultar veículo
  document.getElementById("container-veiculo").style.display = "none";

  resetPecas();
}

export function closeModal() {
  document.body.classList.remove("modal-open");
  document.body.classList.add("modal-close");
  const overlay = document.getElementById("modalOverlay");
  if (!overlay) return;
  overlay.style.display = "none";
}
