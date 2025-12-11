// const moedaBr = (n) => n.toLocalString("pt-BR", {style: "currency", currency: "BRL"});
const hojeFormat = () => new Date().toLocaleDateString("pt-BR");

let estoque = JSON.parse(localStorage.getItem("estoque")) || [];
//let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let vendas = JSON.parse(localStorage.getItem("vendas")) || [];

const btnNovaVenda = document.querySelector(".btn-novo-vendas");
const modalVendas = document.getElementById("modalNovaVendas");
const closeVenda = document.getElementById("closeVenda");
const formVendas = document.getElementById("formNovaVendas");
const selectPeca = document.getElementById("selectPeca");
const inputQtd = document.getElementById("inputQtda");
const spanTotal = document.getElementById("spanTotal");
const selectCliente = document.getElementById("selectCliente");
const btnCancelarVenda = document.getElementById("btnCancelarVenda");
const containerHistorico = document.querySelector(".cartoes");

function popularSelects(){
    selectPeca.innerHTML = `<option value=""> Selecione a peça do estoque</option>`;
    selectCliente.innerHTML = `<option value=""> Selecione um cliente</option>`;

    estoque.array.forEach(item => {
        const opt= document.createElement("option");
        opt.value = clientes.id || clientes.nome;
        opt.textContent = clientes.nome;
        selectCliente.appendChild(opt);
    });
}

function atualizarTotal(){
    const pecaId = Number(selectPeca.value);
    const qtd = Number(inputQtd.value) || 0;

    if(!pecaId || qtd <= 0){
        spanTotal.textContent = "R$ 0,00";
        return;
    }

    const p = estoque.find(i => i.id === pecaId);
    if(!p){
        spanTotal.textContent = "R$ 0,00";
        return;
    }

    spanTotal.textContent = (p.preco * qtd);
}

function renderHistorico(){
    containerHistorico.innerHTML = "";
    const card = document.createElement("div");
    card.classList.add("cartao");
    const titulo = document.createElement("h2");
    titulo.classList.add("cartao-titulo");
    titulo.textContent = "Histórico de Vendas";
    card.appendChild(titulo);

    if(!vendas.length){
        const p = document.createElement("p");
        p.style.opacity = 0.7;
        p.textContent = "Nenhuma venda registrada.";
        card.appendChild(p);
        containerHistorico.appendChild(card);
        return;
    }

    vendas.slice().reverse().forEach(v => {
        const item = document.createElement("div");
        item.classList.add("cartao-item-lista");

        const left = document.createElement("div");
        left.classList.add("container-agrupar");

        const nomePeca = document.createElement("p");
        nomePeca.classList.add("cartao-produto")
        nomePeca.textContent = v.nomeProduto ||v.pecaNome || "Produto";

        const dados = document.createElement("div");

        const spanQtd = document.createElement("span");
        spanQtd.textContent = `Qtd: ${v.quatidade}`;
        
        const spanUnit = document.createElement("span");
        spanUnit.classList.add("detalhe-historico");
        spanUnit.textContent = `Unit: ${v.valorUnidade * v.precoUnitario || 0}`;

        const spanCli = document.createElement("span");
        spanCli.classList.add("detalhe-historico");
        spanCli.textContent = `Cliente: ${v.cliente?.nome || v.clienteNome || " - "}`;

        dados.appendChild(spanQtd);
        dados.appendChild(spanUnit);
        dados.appendChild(spanCli);

        left.appendChild(nomePeca);
        left.appendChild(dados);

        const right = document.createElement("div");
        right.classList.add("valor");

        const cp = document.createElement("p");
        cp.classList.add("cp");
        cp.textContent = v.cp ;

        
        const data = document.createElement("p");
        data.classList.add("data");
        data.textContent = v.data || hojeFormat();

        right.appendChild(cp);
        right.appendChild(data);

        const actions = document.createElement("div");
        actions.classList.add("acoes-historico");

        const btnEditar = document.createElement("button");
        btnEditar.classList.add("btn-editar-venda");
        btnEditar.dataset.id = v.id;

        const btnExcluir = document.createElement("button");
        btnExcluir.classList.add("btn-excluir-venda");
        btnExcluir.dataset.id = v.id;

        actions.appendChild(btnEditar);
        actions.appendChild(btnExcluir);

        item.appendChild(left);
        item.appendChild(right);
        item.appendChild(actions);

        card.appendChild(item);
    });

    containerHistorico.appendChild(card);

    document.querySelectorAll(".btn-excluir-vend").forEach(b =>{
        b.addEventListener("click", (e) => {
            const id = Number(b.dataset.id);
            if(confirm("Deseja excluir esta venda?")){
                excluirVenda(id);
            }
        });
    });

    document.querySelectorAll(".btn-editar-venda").forEach(b => {
    b.addEventListener("click", (e) => {
      const id = Number(b.dataset.id);
      abrirEdicaoVenda(id);
    });
  });
}

function excluirVenda(id) {
  vendas = vendas.filter(v => v.id !== id);
  localStorage.setItem("vendas", JSON.stringify(vendas));
  renderHistorico();
}

let vendaEditandoId = null;
function abrirEdicaoVenda(id) {
  const v = vendas.find(x => x.id === id);
  if (!v) return alert("Venda não encontrada.");
  estoque = JSON.parse(localStorage.getItem("estoque")) || estoque;
  clientes = JSON.parse(localStorage.getItem("clientes")) || clientes;
  popularSelects();

  const peca = estoque.find(p => p.nome === v.nomeProduto) || estoque.find(p => p.id === v.pecaId);
  if (peca) selectPeca.value = peca.id;
  else {
    // Aqui ele vai criar uma opção temporário do nome produto.
    const tmp = document.createElement("option");
    tmp.value = "tmp";
    tmp.textContent = `${v.nomeProduto} (produto não encontrado no estoque)`;
    selectPeca.prepend(tmp);
    selectPeca.value = "tmp";
  }

  inputQtd.value = v.quantidade;

   const clienteObj = clientes.find(c => (c.nome === (v.cliente?.nome || v.clienteNome)));
  if (clienteObj) selectCliente.value = clienteObj.id;
  else {
    const tmpc = document.createElement("option");
    tmpc.value = "tmpc";
    tmpc.textContent = `${v.cliente?.nome || v.clienteNome} (cliente não encontrado)`;
    selectCliente.prepend(tmpc);
    selectCliente.value = "tmpc";
  }
  
  atualizarTotal();
  vendaEditandoId = id;
  modalVendas.showModal();
}
function salvarEdicaoVenda(e) {
  e.preventDefault();
  const id = vendaEditandoId;
  if (!id) return;

  const pecaId = Number(selectPeca.value);
  const qtd = Number(inputQtd.value) || 0;
  const clienteId = selectCliente.value;

  if (!pecaId || pecaId === 0) { alert("Selecione uma peça válida."); return; }
  if (qtd <= 0) { alert("Quantidade inválida."); return; }
  if (!clienteId) { alert("Selecione um cliente."); return; }

  // Ele vai encontrar a peça no estoque
  const peca = estoque.find(i => i.id === pecaId);
  const clienteObj = clientes.find(c => String(c.id) === String(clienteId));

  const total = peca.preco * qtd;

  // Aqui ele vai atualizar as vendas no array
  vendas = vendas.map(v => {
    if (v.id === id) {
      return {
        ...v,
        pecaId,
        nomeProduto: peca.nome,
        quantidade: qtd,
        valorUnidade: peca.preco,
        total,
        clienteId: clienteObj?.id,
        cliente: clienteObj ? { nome: clienteObj.nome, cpf: clienteObj.cpf } : v.cliente,
        data: hojeFormat()
      };
    }
    return v;
  });

  localStorage.setItem("vendas", JSON.stringify(vendas));
  vendaEditandoId = null;
  modalVendas.close();
  renderHistorico();
}

function registrarVenda(event) {
  event.preventDefault();

  estoque = JSON.parse(localStorage.getItem("estoque")) || estoque;
  clientes = JSON.parse(localStorage.getItem("clientes")) || clientes;
  vendas = JSON.parse(localStorage.getItem("vendas")) || vendas;

  const pecaId = Number(selectPeca.value);
  const clienteId = Number(selectCliente.value);
  const quantidade = Number(inputQtd.value) || 0;

  if (!pecaId) { alert("Selecione uma peça."); return; }
  if (!clienteId) { alert("Selecione um cliente."); return; }
  if (quantidade <= 0) { alert("Quantidade inválida."); return; }

  const peca = estoque.find(i => i.id === pecaId);
  const clienteObj = clientes.find(c => c.id === clienteId);

  if (!peca) { alert("Peça inválida."); return; }
  if (peca.quantidade < quantidade) { alert("Estoque insuficiente."); return; }

  const total = Number((peca.preco * quantidade).toFixed(2));
  const venda = {
    id: Date.now(),
    pecaId,
    nomeProduto: peca.nome,
    quantidade,
    valorUnidade: peca.preco,
    total,
    clienteId: clienteObj?.id,
    cliente: clienteObj ? { nome: clienteObj.nome, cpf: clienteObj.cpf } : { nome: "Cliente não identificado", cpf: "" },
    data: hojeFormat()
  };

  // Aqui eu vou atualizar o estoque!
  peca.quantidade = peca.quantidade - quantidade;
  estoque = estoque.map(i => i.id === peca.id ? peca : i);
  localStorage.setItem("estoque", JSON.stringify(estoque));

  vendas.push(venda);
  localStorage.setItem("vendas", JSON.stringify(vendas));

  renderHistorico();
  popularSelects();
  modalVendas.close();
  formVendas.reset();
  inputQtd.value = 1;
  spanTotal.textContent = "R$ 0,00";
  alert("Venda registrada com sucesso!");
}

btnNovaVenda?.addEventListener("click", () => {
  // Vai meio que fazer uma atuailização
  estoque = JSON.parse(localStorage.getItem("estoque")) || estoque;
  clientes = JSON.parse(localStorage.getItem("clientes")) || clientes;
  vendas = JSON.parse(localStorage.getItem("vendas")) || vendas;

  popularSelects();
  inputQtd.value = 1;
  spanTotal.textContent = "R$ 0,00";
  vendaEditandoId = null;
  modalVendas.showModal();
});
closeVenda?.addEventListener("click", () => {
  modalVendas.close();
});
btnCancelarVenda?.addEventListener("click", () => {
  modalVendas.close();
});

selectPeca?.addEventListener("change", atualizarTotal);
inputQtd?.addEventListener("input", atualizarTotal);

formVendas?.addEventListener("submit", (e) => {
  if (vendaEditandoId) {
    salvarEdicaoVenda(e);
  } else {
    registrarVenda(e);
  }
});

renderHistorico();

