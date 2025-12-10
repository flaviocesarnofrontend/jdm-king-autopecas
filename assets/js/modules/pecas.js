// responsável por gerenciar peças selecionadas e total
let pecasSelecionadas = [];
let totalAtual = 0;

const selectPecas = document.getElementById("novo-servico-pecas-utilizadas-select");
const containerPecas = document.querySelector(".peca-selecionadas");

function atualizarListaPecasDOM() {
    if (!containerPecas) return;
    containerPecas.innerHTML = "";

    pecasSelecionadas.forEach(peca => {
        const span = document.createElement("span");
        span.classList.add("peca-selecionada");

        span.innerHTML = `
            ${peca.nome} (x${peca.qtd})
            <img src="../assets/img/servicos/cancel-icon.svg" alt="">
        `;

        span.addEventListener("click", () => removerPeca(peca.id));

        containerPecas.appendChild(span);
    });
}

export function adicionarPecaPorOpcao(opcao) {
    if (!opcao) return;
    if (!opcao.value) return;

    const id = opcao.value;
    const nome = (opcao.text || opcao.textContent).split(" (")[0].trim();
    const preco = Number(opcao.dataset.preco || 0);

    const existente = pecasSelecionadas.find(p => p.id === id);

    if (existente) {
        existente.qtd++;
    } else {
        pecasSelecionadas.push({
            id,
            nome,
            preco,
            qtd: 1
        });
    }

    // limpar seleção visual do select
    opcao.selected = false;

    atualizarListaPecasDOM();
    atualizarTotal();
}

export function removerPeca(id) {
    const peca = pecasSelecionadas.find(p => p.id === id);
    if (!peca) return;

    if (peca.qtd > 1) peca.qtd--;
    else pecasSelecionadas = pecasSelecionadas.filter(p => p.id !== id);

    atualizarListaPecasDOM();
    atualizarTotal();
}

export function atualizarTotal() {
    totalAtual = pecasSelecionadas.reduce((soma, p) => soma + (p.preco * p.qtd), 0);

    const el = document.getElementById("valor-total");
    if (el) {
      el.innerText = totalAtual.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
}

export function resetPecas() {
  pecasSelecionadas = [];
  totalAtual = 0;
  atualizarListaPecasDOM();
  const el = document.getElementById("valor-total");
  if (el) el.innerText = "R$ 0,00";
}

export function getPecas() {
  return pecasSelecionadas.slice(); // cópia
}
export function getTotal() {
  return totalAtual;
}

// inicializa listener do select (se existir no DOM)
if (selectPecas) {
  selectPecas.addEventListener("change", function () {
    const opcao = this.options[this.selectedIndex];
    if (!opcao || !opcao.value || opcao.text.includes("Selecione")) return;
    adicionarPecaPorOpcao(opcao);
  });
}
