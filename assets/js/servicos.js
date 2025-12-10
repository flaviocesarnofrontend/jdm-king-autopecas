import { initLocalStorage } from "./modules/storage.js";
import { openModal, closeModal } from "./modules/modal.js";
import "./modules/clientes.js";
import "./modules/veiculos.js";
import "./modules/pecas.js";
import * as ServicosModule from "./modules/servicos.js";
import "./modules/ui.js";
import "./modules/status.js";

// inicializa storage (cria seeds se necessário)
initLocalStorage();

// expõe funções que HTML chama (onclick attributes)
window.openModal = openModal;
window.closeModal = closeModal;
window.salvarServico = ServicosModule.salvarServico;
window.__alterarStatus = ServicosModule.alterarStatus; // usado pelo onchange do select no card
window.carregarServicos = ServicosModule.carregarServicos;
window.filtrarServicos = ServicosModule.filtrarServicos;

// window.editarServico = ServicosModule.editarServico;
// window.excluirServico = ServicosModule.excluirServico;
// window.salvarEdicaoServico = ServicosModule.salvarEdicaoServico;


// refresh inicial (garantia)
ServicosModule.carregarServicos();
