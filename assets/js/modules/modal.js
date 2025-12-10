// modules/modal.js
import { carregarClientes } from "./clientes.js";
import { resetPecas } from "./pecas.js";

export function openModal() {
  const overlay = document.getElementById("modalOverlay");
  overlay.style.display = "flex";

  carregarClientes();

  // ocultar veículo
  document.getElementById("container-veiculo").style.display = "none";

  resetPecas();
}

export function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  if (!overlay) return;
  overlay.style.display = "none";
}
