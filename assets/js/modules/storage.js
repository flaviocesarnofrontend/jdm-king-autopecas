// modules/storage.js
export let clientes = JSON.parse(localStorage.getItem("clientes")) ?? [];
export let servicos = JSON.parse(localStorage.getItem("servicos")) ?? [];


export function initLocalStorage() {

  // CLIENTES
  if (!localStorage.getItem("clientes")) {

    const clientesIniciais = [
      // {
      //   id: 1,
      //   nome: "João Silva",
      //   cpf: "12345678910",
      //   email: "joao@email.com",
      //   telefone: "11 99999-8888",
      //   veiculos: [
      //     { id: 1, modelo: "Honda Civic", placa: "ABC-1234" },
      //     { id: 2, modelo: "Gol 1.6", placa: "DEF-5678" }
      //   ]
      // },
      // {
      //   id: 2,
      //   nome: "Maria Santos",
      //   cpf: "12345678910",
      //   email: "maria@email.com",
      //   telefone: "11 98888-7777",
      //   veiculos: [
      //     { id: 1, modelo: "Fusca 78", placa: "GHI-2222" }
      //   ]
      // }
    ];

    localStorage.setItem("clientes", JSON.stringify(clientesIniciais));
    clientes.length = 0;
    clientes.push(...clientesIniciais);
  }

  // SERVIÇOS
  if (!localStorage.getItem("servicos")) {
    localStorage.setItem("servicos", JSON.stringify([]));
    servicos.length = 0;
  }
}

export function atualizarClientes() {
  const dados = JSON.parse(localStorage.getItem("clientes"));
  if (Array.isArray(dados)) {
    clientes.length = 0;        // mantém referência
    clientes.push(...dados);
  }
}

export function atualizarServicos() {
  const dados = JSON.parse(localStorage.getItem("servicos"));
  if (Array.isArray(dados)) {
    servicos.length = 0;
    servicos.push(...dados);
  }
}