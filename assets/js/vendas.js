const moedaBr = (n) =>
  Number(n || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

function mascaraCPF(cpf) {
  if (!cpf) return "";

  return cpf
    .toString()
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

const hojeFormat = () => new Date().toLocaleDateString("pt-BR");

const ESTOQUE_KEY = "storage-estoque";
const VENDAS_KEY = "vendas";

let estoque = JSON.parse(localStorage.getItem(ESTOQUE_KEY)) || [];
let vendas = JSON.parse(localStorage.getItem(VENDAS_KEY)) || [];
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

const modal = document.getElementById("modalNovaVendas");
const btnNovaVenda = document.querySelector(".btn-novo-vendas");
// const btnClose = document.getElementById("closeVenda");

const selectPeca = document.getElementById("selectPeca");
const selectCliente = document.getElementById("selectCliente");
const inputQtd = document.getElementById("inputQtd");
const spanTotal = document.getElementById("spanTotal");

btnNovaVenda.addEventListener("click", () => modal.showModal());
// btnClose.addEventListener("click", () => modal.close());

document.getElementById("btnCancelarVenda").addEventListener("click", () => {
  modal.close();
});

function carregarPecas() {
  selectPeca.innerHTML = `<option value="">Selecione a peça</option>`;

  estoque.forEach(p => {
    if (p.quantidade > 0) {
      const op = document.createElement("option");
      op.value = p.id;
      op.textContent = `${p.nome} (${p.quantidade} un.)`;
      op.dataset.preco = p.valorUnitario;
      op.dataset.qtd = p.quantidade;
      selectPeca.appendChild(op);
    }
  });
}

function carregarClientes() {
  selectCliente.innerHTML = `<option value="">Selecione o cliente</option>`;

  clientes.forEach((c) => {
    const op = document.createElement("option");
    op.value = c.id;
    op.textContent = `${c.nome} — ${c.cpf}`;
    selectCliente.appendChild(op);
  });
}

function atualizarTotal() {
  const peca = selectPeca.selectedOptions[0];
  const qtd = Number(inputQtd.value) || 0;

  if (!peca) {
    spanTotal.textContent = "R$ 0,00";
    return;
  }

  const estoqueDisponivel = Number(peca.dataset.qtd);

  if (qtd > estoqueDisponivel) {
    inputQtd.value = estoqueDisponivel;
    alert("Quantidade maior que o estoque disponível!");
    return;
  }

  const valor = Number(peca.dataset.preco);
  spanTotal.textContent = moedaBr(valor * qtd);
}

selectPeca.addEventListener("change", atualizarTotal);
inputQtd.addEventListener("input", atualizarTotal);

// ===============================
// O coração da integração moda aqui
// ===============================
document.getElementById("formNovaVendas").addEventListener("submit", e => {
  e.preventDefault();

  const idPeca = Number(selectPeca.value);
  const qtd = Number(inputQtd.value);
  const idCliente = Number(selectCliente.value);

  const peca = estoque.find(p => p.id === idPeca);
  const cliente = clientes.find(c => c.id === idCliente);

  if (!peca || qtd <= 0 || qtd > peca.quantidade) {
    alert("Venda inválida.");
    return;
  }

  // Cria venda
  const venda = {
    id: Date.now(),
    peca: peca.nome,
    valorUnit: peca.valorUnitario,
    quantidade: qtd,
    cliente: cliente.nome,
    cpf: cliente.cpf,
    total: qtd * peca.valorUnitario,
    data: hojeFormat()
  };

  vendas.unshift(venda);
  localStorage.setItem(VENDAS_KEY, JSON.stringify(vendas));

  // 🔽 Atualiza estoque
  peca.quantidade -= qtd;
  localStorage.setItem(ESTOQUE_KEY, JSON.stringify(estoque));

  modal.close();
  renderHistorico();
  carregarPecas();
});

function renderHistorico() {
  const cartao = document.querySelector(".cartao");
  cartao.innerHTML = ""; //não precisamos dos dados do html estático

  [...vendas]
    .sort((a, b) => a.id - b.id)
    .forEach((venda) => {
      console.log(venda);
    });

  //   vendas.forEach((v) => {
  [...vendas]
    .sort((a, b) => b.id - a.id)
    .forEach((v) => {
      const item = document.createElement("div");
      item.classList.add("cartao-item-lista");
      item.innerHTML = `
              <div class="container-agrupar">
                  <p class="cartao-produtos">${v.peca}</p>
                  <div class="produtos-detalhes-container">
                      <span>Qtd: ${v.quantidade}</span>
                      <span>Unit: ${moedaBr(v.valorUnit)}</span>
                      <span>
                          Cliente: ${v.cliente} - ${mascaraCPF(v.cpf)}
                      </span>
                  </div>
              </div>
              <div class="valor">
                  <p class="cp">${moedaBr(v.total)}</p>
                  <p class="data">${v.data}</p>
              </div>
          `;

      cartao.appendChild(item);
    });
}

carregarPecas();
carregarClientes();
renderHistorico();
