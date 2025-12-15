const clientesMock = [
  {
    id: 1,
    nome: "Marcos Almeida",
    cpf: "12345678910",
    email: "marcos.almeida@email.com",
    telefone: "(11) 98877-1122",
    veiculos: [
      { id: 1, modelo: "Civic", placa: "ABC1D23" }
    ]
  },
  {
    id: 2,
    nome: "Juliana Pereira",
    cpf: "98765432100",
    email: "juliana.pereira@email.com",
    telefone: "(21) 99944-8877",
    veiculos: [
      { id: 1, modelo: "Corolla", placa: "XYZ9K88" },
      { id: 2, modelo: "HB20", placa: "HJK2F77" }
    ]
  },
  {
    id: 3,
    nome: "Fernando Oliveira",
    cpf: "45678912355",
    email: "fernando.oli@email.com",
    telefone: "(31) 97788-6655",
    veiculos: [
      { id: 1, modelo: "Onix", placa: "FFO3B29" }
    ]
  },
  {
    id: 4,
    nome: "Beatriz Ramos",
    cpf: "10230450670",
    email: "bia.ramos@email.com",
    telefone: "(41) 98555-4477",
    veiculos: [
      { id: 1, modelo: "Polo", placa: "RTE6D42" }
    ]
  },
  {
    id: 5,
    nome: "Lucas Martins",
    cpf: "22011033009",
    email: "lucas.martins@email.com",
    telefone: "(51) 99220-5588",
    veiculos: [
      { id: 1, modelo: "Fit", placa: "LUF8C11" },
      { id: 2, modelo: "HR-V", placa: "HVR3A55" }
    ]
  },
  {
    id: 6,
    nome: "Carla Silva",
    cpf: "33299811244",
    email: "carla.silva@email.com",
    telefone: "(62) 98144-9911",
    veiculos: [
      { id: 1, modelo: "Ka", placa: "CAS4G10" }
    ]
  },
  {
    id: 7,
    nome: "Roberto Nogueira",
    cpf: "77855622387",
    email: "roberto.ng@email.com",
    telefone: "(71) 98888-2233",
    veiculos: [
      { id: 1, modelo: "Compass", placa: "JEP7Q02" }
    ]
  },
  {
    id: 8,
    nome: "Ana Paula Moura",
    cpf: "55044311266",
    email: "ana.moura@email.com",
    telefone: "(81) 99122-7755",
    veiculos: [
      { id: 1, modelo: "Argo", placa: "ARG5D77" }
    ]
  },
  {
    id: 9,
    nome: "Diego Santos",
    cpf: "11022033044",
    email: "diego.santos@email.com",
    telefone: "(91) 98444-3311",
    veiculos: [
      { id: 1, modelo: "Gol", placa: "GOL1A99" }
    ]
  },
  {
    id: 10,
    nome: "Patrícia Costa",
    cpf: "99877655421",
    email: "patricia.costa@email.com",
    telefone: "(85) 98766-4400",
    veiculos: [
      { id: 1, modelo: "Creta", placa: "CRT9G40" }
    ]
  }
];

if(!localStorage.getItem("clientes")){
    // clientesMock.forEach((c, index) => c.id = index + 1);
    localStorage.setItem("clientes", JSON.stringify(clientesMock))

}