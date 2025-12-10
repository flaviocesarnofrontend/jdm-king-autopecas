// função pura: recebe clientes e clienteId, preenche select
export function carregarVeiculos(clientes, clienteId) {

  const cliente = clientes.find(c => c.id == clienteId);

  const selectVeiculo = document.getElementById("novo-servico-cliente-carro-select");

  // Zera
  selectVeiculo.innerHTML = `
    <option selected>Selecione o veículo</option>
  `;

  if (!cliente) return;

  cliente.veiculos.forEach(v => {
    selectVeiculo.innerHTML += `
      <option value="${v.id}">
        ${v.modelo} - ${v.placa}
      </option>`;
  });
}
