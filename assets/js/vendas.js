

const moedaBr = (n) =>
    Number(n).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

const hojeFormat = () =>
    new Date().toLocaleDateString("pt-BR");

let estoque = JSON.parse(localStorage.getItem("estoque")) || [];
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let vendas = JSON.parse(localStorage.getItem("vendas")) || [];

const modal = document.getElementById("modalNovaVendas");
const btnNovaVenda = document.querySelector(".btn-novo-vendas");
const btnClose = document.getElementById("closeVenda");

const selectPeca = document.getElementById("selectPeca");
const selectCliente = document.getElementById("selectCliente");
const inputQtd = document.getElementById("inputQtd");
const spanTotal = document.getElementById("spanTotal");

btnNovaVenda.addEventListener("click", () => modal.showModal());
btnClose.addEventListener("click", () => modal.close());

document.getElementById("btnCancelarVenda").addEventListener("click", () => {
    modal.close();
});


function carregarPecas() {
    selectPeca.innerHTML = `<option value="">Selecione a peça</option>`;

    estoque.forEach((p) => {
        const op = document.createElement("option");
        op.value = p.id;
        op.textContent = `${p.nome} — ${moedaBr(p.valor)}`;
        op.dataset.valor = p.valor;
        selectPeca.appendChild(op);
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

    if (!peca || !peca.dataset.valor) {
        spanTotal.textContent = moedaBr(0);
        return;
    }

    const valor = Number(peca.dataset.valor);
    spanTotal.textContent = moedaBr(valor * qtd);
}

selectPeca.addEventListener("change", atualizarTotal);
inputQtd.addEventListener("input", atualizarTotal);

document.getElementById("formNovaVendas").addEventListener("submit", (e) => {
    e.preventDefault();

    const idPeca = selectPeca.value;
    const idCliente = selectCliente.value;
    const qtd = Number(inputQtd.value);

    if (!idPeca || !idCliente || qtd <= 0) {
        alert("Preencha todos os campos!");
        return;
    }

    const pecaInfo = estoque.find((p) => p.id == idPeca);
    const clienteInfo = clientes.find((c) => c.id == idCliente);

    const venda = {
        id: vendas.length + 1,
        peca: pecaInfo.nome,
        valorUnit: pecaInfo.preco,
        quantidade: pecaInfo.quantidade,
        cliente: clienteInfo.nome,
        cpf: clienteInfo.cpf,
        total: qtd * pecaInfo.valor,
        data: hojeFormat(),
    };

    vendas.push(venda);

    localStorage.setItem("vendas", JSON.stringify(vendas));

    alert("Venda registrada com sucesso!");
    modal.close();

    renderHistorico();
});

function renderHistorico() {
    const container = document.querySelector(".cartao");
    container.innerHTML = `
        <div class="cartao-Container-Vendas">
            <h2 class="cartao-titulo">Histórico de Vendas</h2>
        </div>
    `;

    vendas.forEach((v) => {
        const item = document.createElement("div");
        item.classList.add("cartao-item-lista");
        console.log(v)
        item.innerHTML = `
            <div class="container-agrupar">
                <p class="cartao-produtos">${v.nomeProduto}</p>
                <div class="produtos-detalhes-container">
                    <span>Qtd: ${v.quantidade}</span>
                    <span>Unit: ${moedaBr(v.valorUnidade)}</span>
                    <span>
                        Cliente: ${v.cliente.nome} - ${v.cliente.cpf}
                    </span>
                </div>
            </div>
            <div class="valor">
                <p class="cp">R$ ${(v.quantidade * v.valorUnidade).toFixed(2)}</p>
                <p class="data">${v.data}</p>
            </div>
        `;

        container.appendChild(item);
    });
}

carregarPecas();
carregarClientes();
renderHistorico();
