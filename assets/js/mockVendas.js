const vendasMock = [
  {
    id: 1,
    peca: "Óleo 15W40",
    quantidade: 4,
    valorUnit: 120.00,
    cliente: "Carlos Almeida",
    cpf: "123.456.789.11",
    total: 4 * 120.00,
    data: "05/12/2024"
  },
  {
    id: 2,
    peca: "Filtro de ar do motor",
    quantidade: 2,
    valorUnit: 45.00,
    cliente: "Ana Clara",
    cpf: "321.654.987-22",
    total: 2 * 45.00,
    data: "01/12/2024"
  },
  {
    id: 3,
    peca: "Fusivel 10am",
    quantidade: 1,
    valorUnit: 1.00,
    cliente: "Fernanda Costa",
    cpf: "456.789.123-33",
    total: 1 * 1.00,
    data: "29/11/2024"
  },
  {
    id: 4,
    peca: "Velas de ignição",
    quantidade: 4,
    valorUnit: 140.00,
    cliente: "Roberto Siqueira",
    cpf: "654.321.987-44",
    total: 4 * 140.00,
    data: "27/11/2024"
  },
  {
    id: 5,
    peca: "Filtro de combustível",
    quantidade: 1,
    valorUnit: 60.00,
    cliente: "Juliana Ferreira",
    cpf: "852.963.741-55",
    total: 1 * 60.00,
    data: "25/11/2024"
  },
  {
    id: 6,
    peca: "Amortecedor dianteiro",
    quantidade: 2,
    valorUnit: 310.00,
    cliente: "Eduardo Pereira",
    cpf: "741.852.963-66",
    total: 2 * 310.00,
    data: "22/11/2024"
  },
  {
    id: 7,
    peca: "Correia dentada",
    quantidade: 1,
    valorUnit: 180.00,
    cliente: "Bruno Martins",
    cpf: "159.753.486-12",
    total: 1 * 180.00,
    data: "20/11/2024"
  },
  {
    id: 8,
    peca: "Radiador",
    quantidade: 1,
    valorUnit: 420.00,
    cliente: "André Santos",
    cpf: "258.369.147-89",
    total: 1 * 420.00,
    data: "17/11/2024"
  },
  {
    id: 9,
    peca: "Bateria automotiva 60Ah",
    quantidade: 1,
    valorUnit: 480.00,
    cliente: "Patrícia Moreira",
    cpf: "963.258.741-08",
    total: 1 * 480.00,
    data: "14/11/2024"
  },
  {
    id: 10,
    peca: "Rebinboca da Parafuseta",
    quantidade: 8,
    valorUnit: 18.00,
    cliente: "Carlos Eduardo Quirino",
    cpf: "001.123.456.78",
    total: 8 * 18.00,
    data: "12/11/2024"
  }
];

const estoqueMock = [
  { id: 1, nome: "Óleo 15W40", preco: 120.00, quantidade: 10 },
  { id: 2, nome: "Filtro de ar do motor", preco: 45.00, quantidade: 8 },
  { id: 3, nome: "Fusivel 10am", preco: 1.00, quantidade: 50 },
  { id: 4, nome: "Velas de ignição", preco: 140.00, quantidade: 6 },
  { id: 5, nome: "Filtro de combustível", preco: 60.00, quantidade: 12 },
  { id: 6, nome: "Amortecedor dianteiro", preco: 310.00, quantidade: 4 },
  { id: 7, nome: "Correia dentada", preco: 180.00, quantidade: 5 },
  { id: 8, nome: "Radiador", preco: 420.00, quantidade: 3 },
  { id: 9, nome: "Bateria automotiva 60Ah", preco: 480.00, quantidade: 2 },
  { id: 10, nome: "Rebinboca da Parafuseta", preco: 18.00, quantidade: 20 }
];

 if(!localStorage.getItem("estoque")){
   estoqueMock.forEach((d, index) => d.id = index + 1);
   localStorage.setItem("estoque", JSON.stringify(estoqueMock));
 }

if(!localStorage.getItem("vendas")){
  vendasMock.forEach((c, index) => c.id = index + 1);
  localStorage.setItem("vendas", JSON.stringify(vendasMock));
}
