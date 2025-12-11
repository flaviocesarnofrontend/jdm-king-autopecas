import { clientes, servicos, atualizarClientes } from "./storage.js";
import { getPecas, getTotal, resetPecas } from "./pecas.js";
import { getClasseStatus, formatStatus, mostrarToast } from "./status.js";
import { closeModal } from "./modal.js"; // modal.js will export closeModal
import { carregarVeiculos } from "./veiculos.js";

// salva nova OS
export function salvarServico() {

  const clienteId = document.getElementById("novo-servico-cliente-select").value;
  const veiculoId = document.getElementById("novo-servico-cliente-carro-select").value;
  
  const descricaoPedido = document.getElementById("novo-servico-descricao-pedido").value;
  const descricaoExecucao = document.getElementById("novo-servico-descricao-execucao").value;
  const tipoServicoTexto = document.getElementById("novo-servico-select").selectedOptions[0].textContent;

  const pecasAgrupadas = getPecas().map(peca => ({
    nome: peca.nome,
    preco: peca.preco,
    quantidade: peca.qtd
  }));

  const servico = {
    id: Date.now(),
    clienteId: Number(clienteId),
    veiculoId: Number(veiculoId),
    tipoServico: tipoServicoTexto, 
    pedido: descricaoPedido,
    execucao: descricaoExecucao,
    status: "andamento",
    pecas: pecasAgrupadas,
    total: getTotal() ?? 0
  };

  servicos.push(servico);

  localStorage.setItem("servicos", JSON.stringify(servicos));

  // reset
  resetPecas();

  document.getElementById("valor-total").innerText = "R$ 0,00";

  atualizarClientes();
  closeModal();
  carregarServicos();

}

export function editarServico(id) {
  const servico = servicos.find(s => s.id == id);
  if (!servico) return;

  // abre modal
  openModal();

  // seleciona tipo
  document.getElementById("novo-servico-select").value = servico.tipoServico;

  // cliente
  document.getElementById("novo-servico-cliente-select").value = servico.clienteId;

  // carrega veículos depois de selecionar cliente
  carregarVeiculos(servico.clienteId);

  // seta veículo selecionado
  document.getElementById("novo-servico-cliente-carro-select").value = servico.veiculoId;

  // descrições
  document.getElementById("novo-servico-descricao-pedido").value = servico.pedido;
  document.getElementById("novo-servico-descricao-execucao").value = servico.execucao;

  // peças
  pecasSelecionadas = servico.pecas.map(p => ({
    id: p.nome,
    nome: p.nome,
    preco: p.preco,
    qtd: p.quantidade
  }));

  atualizarTotal();
  atualizarListaPecasDOM();

  // trocar ação do botão
  document.querySelector(".close-btn").onclick = () => salvarEdicaoServico(id);
}

export function salvarEdicaoServico(id) {
  const s = servicos.find(s => s.id == id);

  s.tipoServico = document.getElementById("novo-servico-select").selectedOptions[0].textContent;
  s.clienteId = document.getElementById("novo-servico-cliente-select").value;
  s.veiculoId = document.getElementById("novo-servico-cliente-carro-select").value;
  s.pedido = document.getElementById("novo-servico-descricao-pedido").value;
  s.execucao = document.getElementById("novo-servico-descricao-execucao").value;

  s.pecas = pecasSelecionadas.map(p => ({
    nome: p.nome,
    preco: p.preco,
    quantidade: p.qtd
  }));

  s.total = totalAtual;

  localStorage.setItem("servicos", JSON.stringify(servicos));

  closeModal();
  carregarServicos();
}

export function excluirServico(id) {
  if (!confirm("Tem certeza que deseja excluir esta OS?")) return;

  const filtrados = servicos.filter(s => s.id != id);

  servicos.length = 0;        // esvazia mantendo a referência original
  servicos.push(...filtrados); // repopula mantendo a referência

  localStorage.setItem("servicos", JSON.stringify(servicos));
  carregarServicos();
}


// render / listar
export function carregarServicos() {
  servicos.sort((a, b) => b.id - a.id);
  renderizarServicos(servicos);
}

export function renderizarServicos(lista) {

  const container = document.getElementById("cartoesContainer");
  if (!container) return;
  container.innerHTML = "";

  lista.forEach(servico => {

    const cliente = clientes.find(c => c.id == servico.clienteId) || { nome: "—" };
    const veiculo = (cliente.veiculos || []).find(v => v.id == servico.veiculoId) || { modelo: "-", placa: "-" };
    console.log(veiculo);
    
    container.innerHTML += `
        <div class="cartao">
            <div class="cartao-componentes-preco">
                <div class="cartao-componente-container">
                    <p class="cartao-componente-nome">${servico.tipoServico}</p>
                    <span class="${getClasseStatus(servico.status)}">${formatStatus(servico.status)}</span>
                    <p class="cartao-ordem-servico">OS <span class="cartao-ordem-servico-numero">#${servico.id}</span></p>
                </div>
                <p class="cartao-componente-preco">
                    ${(servico.total ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </p>
            </div>
            <div class="cartao-dados-cliente-container">
                <p class="cartao-nome-cliente">
                    <img src="../assets/img/servicos/user-icon.svg" alt="">
                    ${cliente.nome}
                </p>
                <p class="cartao-nome-carro">
                    <img src="../assets/img/servicos/car-icon.svg" alt="">
                    ${veiculo.modelo} - ${veiculo.placa}
                </p>
                <p class="cartao-data">
                    <img src="../assets/img/servicos/calendario.svg" alt="">
                    26/11/2025
                </p>
            </div>
            <div class="cartao-pedido-container">
                <p class="cartao-pedido-label">Pedido:</p>
                <p class="cartao-pedido">${servico.pedido}</p>
            </div>
            <div class="cartao-execucao-container">
                <p class="cartao-execucao-label">Execução:</p>
                <p class="cartao-execucao">${servico.execucao}</p>
            </div>
            <div class="cartao-pecas-utilizadas-container">
                <p class="cartao-pecas-utilizadas-label">Peças Utilizadas:</p>
                <div class="cartao-container-peca">
                    ${(servico.pecas && servico.pecas.length > 0)
                        ? servico.pecas.map(p => `<p class="cartao-peca">${p.nome} (x${p.quantidade})</p>`).join("")
                        : `<p class="cartao-peca">— Nenhuma peça —</p>`}
                </div>
            </div>
                <div class="linha-separadora"></div>
            <div class="cartao-status-editar-excluir-container">
              <select onchange="window.__alterarStatus && window.__alterarStatus(${servico.id}, this.value)" class="cartao-status-select dropdown-select-arrow">
                  <option value="andamento" ${servico.status==="andamento"?"selected":""}>Em andamento</option>
                  <option value="concluido" ${servico.status==="concluido"?"selected":""}>Concluído</option>
                  <option value="entregue" ${servico.status==="entregue"?"selected":""}>Entregue</option>
              </select>
              <div class="cartao-editar-excluir-buttons">
                  <a href="#" class="cartao-editar-button" onclick="editarServico(${servico.id})"><img src="../assets/img/servicos/edit-icon.svg" alt=""></a>
                  <a href="#" class="cartao-excluir-button" onclick="excluirServico(${servico.id})"><img src="../assets/img/servicos/delete-icon.svg" alt=""></a>
              </div>
            </div>
        </div>
    `;
  });
}

// alterarStatus e filtrar estão aqui para manter a lógica
export function alterarStatus(id, novoStatus) {

  const servico = servicos.find(s => s.id == id);
  if (!servico) return;

  servico.status = novoStatus;

  localStorage.setItem("servicos", JSON.stringify(servicos));

  carregarServicos();
  mostrarToast(formatStatus(servico.status));
}

// busca/filtra
export function filtrarServicos(texto) {

  texto = texto.toLowerCase();

  const servicosFiltrados = servicos.filter(servico => {

    const cliente = clientes.find(c => c.id == servico.clienteId) || { nome: "" };
    const veiculo = (cliente.veiculos || []).find(v => v.id == servico.veiculoId) || { modelo: "", placa: "" };

    return (
      servico.id.toString().includes(texto) ||
      cliente.nome.toLowerCase().includes(texto) ||
      veiculo.modelo.toLowerCase().includes(texto) ||
      veiculo.placa.toLowerCase().includes(texto) ||
      (servico.pedido || "").toLowerCase().includes(texto) ||
      (servico.execucao || "").toLowerCase().includes(texto)
    );

  });

  renderizarServicos(servicosFiltrados);
}

// expõe uma função global segura para o onchange do select dinâmico no card
window.__alterarStatus = alterarStatus;

// quando o módulo é importado, carrega serviços imediatamente
carregarServicos();