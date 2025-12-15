// Google chart =============================

google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

    var data = google.visualization.arrayToDataTable([
        ['status', 'statistic'],
        ['Normal',82],
        ['Crítico',18],
    ]);

    const options = {
        width: 61,
        height: 61,
        legend: "none",     // remove legenda
        pieSliceText: "none", // remove textos
        chartArea: {
        width: "100%",
        height: "100%"
        },
        enableInteractivity: false, // remove interatividades
        tooltip: { trigger: "none" }, // remove outras legendas
        pieHole: 0,       // cria um buraco no centro
        pieStartAngle: 180, // rotação
        backgroundColor: "transparent", //bg atrás do gráfico
        colors: ['#007D00', '#F9B11F'],
    };

    var chart = new google.visualization.PieChart(document.getElementById('grafico'));

    chart.draw(data, options);
}

// Google chart FIM =============================
// Modal ============================
function openModal() {
  document.body.classList.remove("modal-close");
  document.body.classList.add("modal-open");
  const modal = document.getElementById("modal-nova-peca");
  modal.style.display = "flex";
}

function closeModal() {
  document.body.classList.remove("modal-open");
  document.body.classList.add("modal-close");
  const modal = document.getElementById("modal-nova-peca");
  if (!modal) return;
  modal.style.display = "none";
}
// FIM Modal ====================================

// pesquisa

/**
 * 
 * Essa pesquisa é a ideal pois ela normaliza palavras como Óleo, Oleo, óleo e oleo
 * 
 */

const inputBusca = document.getElementById("busca");

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

inputBusca.addEventListener("input", () => {
  const termo = normalizar(inputBusca.value);

  const cartoes = document.querySelectorAll(".cartao");

  cartoes.forEach(cartao => {
    const nome = normalizar(
      cartao.querySelector(".cartao-titulo").textContent
    );

    const codigo = normalizar(
      cartao.querySelector(".cartao-codigo-peca").textContent
    );

    const encontrado =
      nome.includes(termo) || codigo.includes(termo);

    cartao.style.display = encontrado ? "block" : "none";
  });
});

// fim pesquisa

// Validador campo de dinheiro ========================

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

// FIM Validador campo de dinheiro ======================