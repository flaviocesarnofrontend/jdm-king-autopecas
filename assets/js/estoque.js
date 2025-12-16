//Validador de dinheiro

const inputValor = document.getElementById("modal-valor-unitario");

function formatarValor(valorNumerico) {
  let valor = (valorNumerico / 100).toFixed(2);
  valor = valor.replace(".", ",");
  valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return "R$ " + valor;
}

function moverCursorParaFinal() {
  requestAnimationFrame(() => {
    const len = inputValor.value.length;
    inputValor.setSelectionRange(len, len);
  });
}

inputValor.addEventListener("input", () => {
  let numeros = inputValor.value.replace(/\D/g, "");

  if (!numeros) {
    inputValor.value = "";
    return;
  }

  inputValor.value = formatarValor(parseInt(numeros, 10));
  moverCursorParaFinal();
});

/* 🔒 Impede o cursor de ficar antes do R$ */
inputValor.addEventListener("click", moverCursorParaFinal);
inputValor.addEventListener("keydown", moverCursorParaFinal);
inputValor.addEventListener("focus", moverCursorParaFinal);

/* 🔁 Se sair com R$ 0,00 → volta ao placeholder */
inputValor.addEventListener("blur", () => {
  if (inputValor.value === "R$ 0,00") {
    inputValor.value = "";
  }
});

//FIM Validador de dinheiro

//Modal

function openModal() {
    document.body.classList.remove("modal-close");
    document.body.classList.add("modal-open");
    const modal = document.getElementById("modal-nova-peca");
    modal.style.display = "flex";

    if (!pecaEditando && btnSalvar) {
        btnSalvar.textContent = "Cadastrar peça";
    }
}

function closeModal() {
  document.body.classList.remove("modal-open");
  document.body.classList.add("modal-close");
  const modal = document.getElementById("modal-nova-peca");
  if (!modal) return;
  modal.style.display = "none";
}

//FIM Modal

// pesquisa

/**
 * 
 * Essa pesquisa é a ideal pois ela normaliza palavras como Óleo, Oleo, óleo e oleo
 * 
 */

const inputBusca = document.getElementById("busca");

function normalizarTexto(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

inputBusca.addEventListener("input", () => {
  const termo = normalizarTexto(inputBusca.value);
  const cartoes = document.querySelectorAll(".cartao");

  cartoes.forEach(cartao => {
    const titulo = normalizarTexto(
      cartao.querySelector(".cartao-titulo").textContent
    );

    const codigo = normalizarTexto(
      cartao.querySelector(".cartao-codigo-peca").textContent
    );

    const encontrado =
      titulo.includes(termo) || codigo.includes(termo);

    cartao.style.display = encontrado ? "block" : "none";
  });
});

// fim pesquisa

// ===============================
// CONFIG LOCAL STORAGE
// ===============================
// const STORAGE_KEY = "storage-estoque";
// a referência foi transferida para o arquivo de mock.

//Edição - variável de controle
let pecaEditando = null;

// ===============================
// UTILIDADES
// ===============================
function getEstoque() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function setEstoque(dados) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
}

function gerarCodigo() {
    return "#" + Date.now();
}

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

//Regra que define a condição de cada status.
//Para definir crítico, o estoque precisa estar igual OU abaixo de 50% do mínimo.
//Para definir estoque normal, ele precisa ser igual ou superior a 30% do atencao. 
function definirStatus(qtd, minimo) {
    if (qtd <= minimo * 0.5) {
        return { texto: "Crítico", classe: "cartao-status-peca-critico" };
    }

    if (qtd <= minimo * 1.3) {
        return { texto: "Atenção", classe: "cartao-status-peca-atencao" };
    }

    return { texto: "Normal", classe: "cartao-status-peca-normal" };
}

// ===============================
// EDIÇÃO
// ===============================

function abrirEdicao(id) {
    const estoque = getEstoque();
    pecaEditando = estoque.find(p => p.id == id);
    if (!pecaEditando) return;

    document.getElementById("nome-peca-nova").value = pecaEditando.nome;
    document.getElementById("qtd-peca-nova").value = pecaEditando.quantidade;
    document.getElementById("modal-qtd-minima-peca-nova").value = pecaEditando.minimo;
    document.getElementById("modal-valor-unitario").value =
        formatarValor(Math.round(pecaEditando.valorUnitario * 100));

    
    btnSalvar.textContent = "Salvar edição";
    openModal();
}   

// ===============================
// EXCLUIR
// ===============================

function excluirPeca(id) {
    if (!confirm("Deseja realmente excluir esta peça?")) return;

    let estoque = getEstoque();
    estoque = estoque.filter(p => p.id != id);

    setEstoque(estoque);
    renderizarEstoque();
    atualizarDashboard();
}

// ===============================
// RENDERIZAÇÃO
// ===============================
function renderizarEstoque() {
    const container = document.querySelector(".cartoes");
    container.innerHTML = "";

    const estoque = getEstoque();

    estoque.forEach(peca => {
        const status = definirStatus(peca.quantidade, peca.minimo);
        const valorTotal = peca.quantidade * peca.valorUnitario;

        const card = document.createElement("div");
        card.classList.add("cartao");

        card.innerHTML = `
            <div class="cartao-header">
                <h3 class="cartao-titulo">${peca.nome}</h3>
                <span class="cartao-codigo-peca">${peca.codigo}</span>
                <span class="${status.classe}">${status.texto}</span>
                <div class="cartao-botoes">
                    <a href="#" class="btn-editar" data-id="${peca.id}">
                        <img src="../assets/img/estoque/edit-icon.svg" alt="">
                    </a>
                    <a href="#" class="btn-excluir" data-id="${peca.id}">
                        <img src="../assets/img/estoque/delete-icon.svg" alt="">
                    </a>
                </div>
            </div>
            

            <div class="cartao-main">
                <div class="cartao-dados">
                    <span class="cartao-dado-label">Quantidade</span>
                    <span class="cartao-dado">${peca.quantidade}</span>
                </div>
                <div class="cartao-dados">
                    <span class="cartao-dado-label">Mínimo</span>
                    <span class="cartao-dado">${peca.minimo}</span>
                </div>
                <div class="cartao-dados">
                    <span class="cartao-dado-label">Valor Unit.</span>
                    <span class="cartao-dado">${formatarMoeda(peca.valorUnitario)}</span>
                </div>
            </div>

            <div class="cartao-footer">
                <div class="cartao-dados">
                    <span class="cartao-dado-label">Valor Total</span>
                    <span class="cartao-dado">${formatarMoeda(valorTotal)}</span>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    // Atualiza o dashboard com os novos dados
    atualizarDashboard();
}

//Eventos dos botões (delegação correta)
document.querySelector(".cartoes").addEventListener("click", (e) => {
    const editar = e.target.closest(".btn-editar");
    const excluir = e.target.closest(".btn-excluir");

    if (editar) {
        e.preventDefault();
        abrirEdicao(editar.dataset.id);
    }

    if (excluir) {
        e.preventDefault();
        excluirPeca(excluir.dataset.id);
    }
});

// ===============================
// SALVAR NOVA PEÇA
// ===============================
function salvarServico() {
    const nome = document.getElementById("nome-peca-nova").value.trim();
    const quantidade = Number(document.getElementById("qtd-peca-nova").value);
    const minimo = Number(document.getElementById("modal-qtd-minima-peca-nova").value);
    const valorTexto = document.getElementById("modal-valor-unitario").value;

    if (!nome || quantidade <= 0) {
        alert("Preencha os campos corretamente.");
        return;
    }

    const valorUnitario = Number(valorTexto.replace(/\D/g, "")) / 100;
    const estoque = getEstoque();

    if (pecaEditando) {
        // EDITAR
        const index = estoque.findIndex(p => p.id === pecaEditando.id);
        if (index !== -1) {
            estoque[index] = {
                ...estoque[index],
                nome,
                quantidade,
                minimo,
                valorUnitario
            };
        }
        pecaEditando = null;
    } else {
        // NOVA PEÇA
        estoque.unshift({
            id: Date.now(),
            nome,
            quantidade,
            minimo,
            valorUnitario,
            codigo: gerarCodigo()
        });
    }

    setEstoque(estoque);
    renderizarEstoque();
    atualizarDashboard();
    closeModal();

    // limpar form
    document.getElementById("nome-peca-nova").value = "";
    document.getElementById("qtd-peca-nova").value = "";
    document.getElementById("modal-qtd-minima-peca-nova").value = "";
    document.getElementById("modal-valor-unitario").value = "";
}

// ===============================
// ATUALIZAÇÃO DO DASHBOARD
// ===============================
function atualizarDashboard() {
    const estoque = getEstoque();

    let atencao = 0;
    let criticos = 0;
    let normal = 0;
    let totalQtd = 0;

    estoque.forEach(item => {
        totalQtd += item.quantidade;

        if (item.quantidade <= item.minimo * 0.5) {
            criticos++;
        } else if (item.quantidade <= item.minimo * 1.3) {
            atencao++;
        } else {
            normal++;
        }
    });

    document.getElementById("estoque-atencao-estatistica").textContent = atencao;
    document.getElementById("estoque-criticos-estatistica").textContent = criticos;
    document.getElementById("estoque-qtd-total").textContent = totalQtd;

    // Gráfico
    atualizarGrafico(normal, atencao, criticos);
}


// ===============================
// ATUALIZAÇÃO DO GRÁFICO
// ===============================
function atualizarGrafico(normal, atencao, criticos) {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(() => {
        const data = google.visualization.arrayToDataTable([
            ["Status", "Quantidade"],
            ["Normal", normal],
            ["Atenção", atencao],
            ["Crítico", criticos]
        ]);

        const options = {
            width: 61,
            height: 61,
            legend: "none",
            pieSliceText: "none",
            backgroundColor: "transparent",
            enableInteractivity: false, // remove interatividades
            tooltip: { trigger: "none" }, // remove outras legendas
            pieHole: 0,       // cria um buraco no centro
            pieStartAngle: 180, // rotação
            chartArea: {
                width: "100%",
                height: "100%"
            },
            slices: {
                0: { color: "#007D00" }, // verde
                1: { color: "#F9B11F" }, // amarelo
                2: { color: "#e01313" }  // vermelho
            },
        };

        const chart = new google.visualization.PieChart(
            document.getElementById("grafico")
        );

        chart.draw(data, options);
    });
}

// ===============================
// INICIALIZAÇÃO
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    btnSalvar = document.querySelector(".modal-botao-salvar");
    renderizarEstoque();
    atualizarDashboard();
});