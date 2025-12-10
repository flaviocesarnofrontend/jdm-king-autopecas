import { clientes } from "./storage.js";
import { carregarVeiculos } from "./veiculos.js";

// exporta função para o modal usar
export function carregarClientes() {
  const selectCliente = document.getElementById("novo-servico-cliente-select");

  // limpa opções
  selectCliente.innerHTML = `
    <option selected>Nome do cliente</option>
  `;

  // joga cada cliente como uma opção
  clientes.forEach(cliente => {
    selectCliente.innerHTML += `
      <option value="${cliente.id}">${cliente.nome}</option>
    `;
  });
}

// adiciona listener (executado ao importar o módulo)
const selectClienteEl = document.getElementById("novo-servico-cliente-select");
if (selectClienteEl) {
  selectClienteEl.addEventListener("change", function() {
    carregarVeiculos(clientes, this.value);
  });
}
