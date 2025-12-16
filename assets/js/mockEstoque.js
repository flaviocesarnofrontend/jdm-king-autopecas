const estoqueMock = [
  {
    id: 1,
    nome: "Óleo 15W40",
    quantidade: 10,
    minimo: 8,
    valorUnitario: 120.00,
    codigo: "#MOCK-001"
  },
  {
    id: 2,
    nome: "Filtro de ar do motor",
    quantidade: 8,
    minimo: 10,
    valorUnitario: 45.00,
    codigo: "#MOCK-002"
  },
  {
    id: 3,
    nome: "Fusível 10A",
    quantidade: 50,
    minimo: 20,
    valorUnitario: 1.00,
    codigo: "#MOCK-003"
  },
  {
    id: 4,
    nome: "Velas de ignição",
    quantidade: 6,
    minimo: 8,
    valorUnitario: 140.00,
    codigo: "#MOCK-004"
  },
  {
    id: 5,
    nome: "Filtro de combustível",
    quantidade: 12,
    minimo: 10,
    valorUnitario: 60.00,
    codigo: "#MOCK-005"
  },
  {
    id: 6,
    nome: "Amortecedor dianteiro",
    quantidade: 4,
    minimo: 6,
    valorUnitario: 310.00,
    codigo: "#MOCK-006"
  },
  {
    id: 7,
    nome: "Correia dentada",
    quantidade: 5,
    minimo: 6,
    valorUnitario: 180.00,
    codigo: "#MOCK-007"
  },
  {
    id: 8,
    nome: "Radiador",
    quantidade: 3,
    minimo: 6,
    valorUnitario: 420.00,
    codigo: "#MOCK-008"
  },
  {
    id: 9,
    nome: "Bateria automotiva 60Ah",
    quantidade: 2,
    minimo: 5,
    valorUnitario: 480.00,
    codigo: "#MOCK-009"
  }
];


//Só carregar o mock se o estoque estiver vazio
const STORAGE_KEY = "storage-estoque";

if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(estoqueMock));
}