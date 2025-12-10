export let clientes = JSON.parse(localStorage.getItem("clientes")) ?? [];
export let servicos = JSON.parse(localStorage.getItem("servicos")) ?? [];

export function initLocalStorage() {

  if (!localStorage.getItem("clientes")) {

    const clientesIniciais = [
      {
        id: 1,
        nome: "João Silva",
        telefone: "11 99999-8888",
        veiculos: [
          { id: 1, modelo: "Honda Civic", placa: "ABC-1234" },
          { id: 2, modelo: "Gol 1.6", placa: "DEF-5678" }
        ]
      },
      {
        id: 2,
        nome: "Maria Santos",
        telefone: "11 98888-7777",
        veiculos: [
          { id: 1, modelo: "Fusca 78", placa: "GHI-2222" }
        ]
      }
    ];

    localStorage.setItem("clientes", JSON.stringify(clientesIniciais));
    clientes = clientesIniciais;
  }

  if (!localStorage.getItem("servicos")) {
    localStorage.setItem("servicos", JSON.stringify([]));
    servicos = [];
  }
}
