import { filtrarServicos, carregarServicos } from "./servicos.js";

// liga Busca
const buscaEl = document.getElementById("busca");
if (buscaEl) {
  buscaEl.addEventListener("input", function () {
    filtrarServicos(this.value);
  });
}

// exporta util se precisar
export function refreshList() {
  carregarServicos();
}
