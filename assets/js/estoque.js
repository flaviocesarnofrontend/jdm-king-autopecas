// ===============================
// CONFIG LOCAL STORAGE
// ===============================
const STORAGE_KEY = "storage-estoque";

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

function definirStatus(qtd, minimo) {
    if (qtd <= 0 || qtd < minimo) {
        return { texto: "Crítico", classe: "cartao-status-peca-critico" };
    }
    if (qtd === minimo) {
        return { texto: "Atenção", classe: "cartao-status-peca-atencao" };
    }
    return { texto: "Normal", classe: "cartao-status-peca-normal" };
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
                    <a href="#"><img src="../assets/img/estoque/edit-icon.svg" alt=""></a>
                    <a href="#"><img src="../assets/img/estoque/delete-icon.svg" alt=""></a>
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

// ===============================
// SALVAR NOVA PEÇA
// ===============================
function salvarServico() {
    const nome = document.getElementById("nome-peca-nova").value.trim();
    const quantidade = Number(document.getElementById("qtd-peca-nova").value);
    const minimo = Number(document.getElementById("modal-qtd-minima-peca-nova").value);
    const valorTexto = document.getElementById("modal-valor-unitario").value;

    if (!nome || quantidade <= 0) {
        alert("Preencha os campos obrigatórios corretamente.");
        return;
    }

    const valorUnitario = Number(
        valorTexto.replace(/[^\d]/g, "")
    ) / 100;

    const novaPeca = {
        id: Date.now(),
        nome,
        quantidade,
        minimo,
        valorUnitario,
        codigo: gerarCodigo()
    };

    const estoque = getEstoque();
    estoque.unshift(novaPeca); // nova peça sempre primeiro
    setEstoque(estoque);

    renderizarEstoque(); // Renderiza a nova peça no estoque
    closeModal();

    // Limpa o formulário
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

    estoque.forEach(item => {
        if (item.quantidade < item.minimo) {
            criticos++;
        } else if (item.quantidade === item.minimo) {
            atencao++;
        } else {
            normal++;
        }
    });

    // Atualiza contadores
    document.getElementById("estoque-atencao-estatistica").textContent = atencao;
    document.getElementById("estoque-criticos-estatistica").textContent = criticos;

    // Atualiza gráfico
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
            legend: "none",
            pieSliceText: "none",
            backgroundColor: "transparent",
            chartArea: {
                width: "90%",
                height: "90%"
            },
            slices: {
                0: { color: "#007D00" }, // verde
                1: { color: "#F9B11F" }, // amarelo
                2: { color: "#e01313" }  // vermelho
            },
            tooltip: { trigger: "none" }
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
    renderizarEstoque();
    atualizarDashboard();
});