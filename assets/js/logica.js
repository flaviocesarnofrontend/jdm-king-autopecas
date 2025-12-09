function carregarClientes() {
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

function carregarVeiculos(clienteId) {

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

document.getElementById("novo-servico-cliente-select").addEventListener("change", function() {
  carregarVeiculos(this.value);
});

function salvarServico() {

  const clienteId = document.getElementById("novo-servico-cliente-select").value;
  const veiculoId = document.getElementById("novo-servico-cliente-carro-select").value;
  const descricaoPedido = document.getElementById("novo-servico-descricao-pedido").value;
  const descricaoExecucao = document.getElementById("novo-servico-descricao-execucao").value;
  const tipoServicoTexto = document.getElementById("novo-servico-select").selectedOptions[0].textContent;


  // montar objeto (inicialmente setamos pecas/total antes de salvar)
  const servico = {
    id: Date.now(),
    clienteId,
    veiculoId,
    tipoServico: tipoServicoTexto, 
    pedido: descricaoPedido,
    execucao: descricaoExecucao,
    status: "andamento",
    pecas: pecasSelecionadas.slice(), // copia do array atual
    total: totalAtual ?? 0
  };

  // salvar no array E localStorage (APÓS já termos definido pecas/total)
  servicos.push(servico);
  localStorage.setItem("servicos", JSON.stringify(servicos));

  // reset do modal (deixe o modal limpo para próxima vez)
  pecasSelecionadas = [];
  totalAtual = 0;
  document.getElementById("valor-total").innerText = "R$ 0,00";

  closeModal();

  // recarregar lista
  carregarServicos();
}

function getClasseStatus(status) {
  switch (status) {
    case "andamento": return "cartao-status-andamento";
    case "concluido": return "cartao-status-concluido";
    case "entregue": return "cartao-status-entregue";
  }
}

function formatStatus(status) {
  switch (status) {
    case "andamento": return "Em andamento";
    case "concluido": return "Concluído";
    case "entregue": return "Entregue";
  }
}

function carregarServicos() {
  renderizarServicos(servicos);
}

function renderizarServicos(lista) {

  const container = document.getElementById("cartoesContainer");
  container.innerHTML = "";

  lista.forEach(servico => {

    const cliente = clientes.find(c => c.id == servico.clienteId);
    const veiculo = cliente.veiculos.find(v => v.id == servico.veiculoId);

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
                        ? servico.pecas.map(p => `<p class="cartao-peca">${p.nome}</p>`).join("")
                        : `<p class="cartao-peca">— Nenhuma peça —</p>`}
                </div>
            </div>
                <div class="linha-separadora"></div>
            <select onchange="alterarStatus(${servico.id}, this.value)" class="cartao-status-select dropdown-select-arrow">
                <option value="andamento" ${servico.status==="andamento"?"selected":""}>Em andamento</option>
                <option value="concluido" ${servico.status==="concluido"?"selected":""}>Concluído</option>
                <option value="entregue" ${servico.status==="entregue"?"selected":""}>Entregue</option>
            </select>
        </div>
    `;
  });
}

function mostrarToast(mensagem) {
    const toast = document.getElementById("toast-status");

    /**
     * 
     * adicionar os textos corretos aqui depois (resolvido)
     * adicionar o posicionamento correto do toast em telas >800px
     * 
     */

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

function alterarStatus(id, novoStatus) {

  const servico = servicos.find(s => s.id == id);
  servico.status = novoStatus;

  localStorage.setItem("servicos", JSON.stringify(servicos));

  carregarServicos();
  mostrarToast(servico.status);
}

carregarServicos();

document.getElementById("busca").addEventListener("input", function () {
  filtrarServicos(this.value);
});

function filtrarServicos(texto) {

  texto = texto.toLowerCase();

  const servicosFiltrados = servicos.filter(servico => {

    const cliente = clientes.find(c => c.id == servico.clienteId);
    const veiculo = cliente.veiculos.find(v => v.id == servico.veiculoId);

    return (
      servico.id.toString().includes(texto) ||
      cliente.nome.toLowerCase().includes(texto) ||
      veiculo.modelo.toLowerCase().includes(texto) ||
      veiculo.placa.toLowerCase().includes(texto) ||
      servico.pedido.toLowerCase().includes(texto) ||
      servico.execucao.toLowerCase().includes(texto)
    );

  });

  renderizarServicos(servicosFiltrados);

}

document.getElementById("novo-servico-pecas-utilizadas-select").addEventListener("change", function() {

  const select = this;
  const opcao = select.options[select.selectedIndex];

  if (!opcao || !opcao.value || opcao.value === "Selecione a peça do estoque") return;

  // pega preço do atributo data-preco (mais confiável)
  const valor = Number(opcao.dataset.preco || 0);

  // extrai só o nome antes do parêntese "(Disponível: ...)" se houver
  const nomeLimpo = (opcao.text || opcao.textContent).split(" (")[0].trim();

  adicionarPeca(nomeLimpo, valor);
});

let pecasSelecionadas = [];
let totalAtual = 0;

function adicionarPeca(nome, preco) {
  // garante número
  const precoNum = Number(preco) || 0;

  pecasSelecionadas.push({ nome: nome, preco: precoNum });

  totalAtual = Number(totalAtual) + precoNum;

  document.getElementById("valor-total").innerText =
    totalAtual.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}