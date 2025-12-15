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