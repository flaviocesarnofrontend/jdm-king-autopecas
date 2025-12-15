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