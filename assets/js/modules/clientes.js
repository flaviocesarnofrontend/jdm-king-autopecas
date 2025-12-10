// modules/clientes.js
import { clientes } from "./storage.js";
import { carregarVeiculos } from "./veiculos.js";

export function carregarClientes() {
  const selectCliente = document.getElementById("novo-servico-cliente-select");
  const selectVeiculo = document.getElementById("novo-servico-cliente-carro-select");
  const containerVeiculo = document.getElementById("container-veiculo");

  if (!selectCliente || !selectVeiculo) return;

  selectCliente.innerHTML = `<option selected value="">Nome do cliente</option>`;

  selectVeiculo.innerHTML = `<option selected>Selecione o veículo</option>`;
  selectVeiculo.disabled = true;

  containerVeiculo.style.display = "none";

  clientes.forEach(cliente => {
    selectCliente.innerHTML += `
      <option value="${cliente.id}">${cliente.nome}</option>
    `;
  });
}

// Setar cliente programaticamente e disparar change
export function selecionarClienteParaEdicao(clienteId) {
  const selectCliente = document.getElementById("novo-servico-cliente-select");
  if (!selectCliente) return;

  selectCliente.value = clienteId;

  // força executar tudo como se tivesse mudado
  const evento = new Event("change");
  selectCliente.dispatchEvent(evento);

  // bloqueia edição
  selectCliente.disabled = true;
}

// listener
const selectClienteEl = document.getElementById("novo-servico-cliente-select");
if (selectClienteEl) {
  selectClienteEl.addEventListener("change", function () {
    const clienteId = this.value;
    const containerVeiculo = document.getElementById("container-veiculo");
    const selectVeiculo = document.getElementById("novo-servico-cliente-carro-select");

    if (!clienteId) {
      containerVeiculo.style.display = "none";
      selectVeiculo.innerHTML = `<option selected>Selecione o veículo</option>`;
      selectVeiculo.disabled = true;
      return;
    }

    containerVeiculo.style.display = "block";
    selectVeiculo.disabled = false;
    carregarVeiculos(clienteId);
  });
}
