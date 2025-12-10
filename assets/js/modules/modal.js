import { carregarClientes } from "./clientes.js";
import { resetPecas } from "./pecas.js";

export function openModal() {
  const overlay = document.getElementById("modalOverlay");
  if (!overlay) return;
  overlay.style.display = "flex";

  // carrega clientes no select
  carregarClientes();

  // reseta peças e total
  resetPecas();
}

export function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  if (!overlay) return;
  overlay.style.display = "none";
}
