// modules/veiculos.js
import { clientes } from "./storage.js";

export function carregarVeiculos(clienteId) {
  const selectVeiculo = document.getElementById("novo-servico-cliente-carro-select");
  if (!selectVeiculo) return;

  // Zera
  selectVeiculo.innerHTML = `<option selected>Selecione o veículo</option>`;

  // encontra cliente (clientes vem do storage)
  const cliente = clientes.find(c => String(c.id) === String(clienteId));
  if (!cliente || !cliente.veiculos) {
    // desabilita se não houver veículo
    selectVeiculo.disabled = true;
    return;
  }

  // habilita e popula
  selectVeiculo.disabled = false;
  cliente.veiculos.forEach(v => {
    selectVeiculo.innerHTML += `
      <option value="${v.id}">
        ${v.modelo} - ${v.placa}
      </option>`;
  });
}
