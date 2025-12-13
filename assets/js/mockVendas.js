const vendasMock = [
  { id: 1, nomeProduto: "Óleo 15W40", quantidade: 4, valorUnidade: 120.00, cliente: { nome: "Carlos Almeida", cpf: "123.456.789.11" }, data: "05/12/2024" },
  { id: 2, nomeProduto: "Filtro de ar do motor", quantidade: 2, valorUnidade: 45.00, cliente: { nome: "Ana Clara", cpf: "321.654.987-22" }, data: "01/12/2024" },
  { id: 3, nomeProduto: "Fusivel 10am", quantidade: 1, valorUnidade: 1.00, cliente: { nome: "Fernanda Costa", cpf: "456.789.123-33" }, data: "29/11/2024" },
  { id: 4, nomeProduto: "Velas de ignição", quantidade: 4, valorUnidade: 140.00, cliente: { nome: "Roberto Siqueira", cpf: "654.321.987-44" }, data: "27/11/2024" },
  { id: 5, nomeProduto: "Filtro de combustível", quantidade: 1, valorUnidade: 60.00, cliente: { nome: "Juliana Ferreira", cpf: "852.963.741-55" }, data: "25/11/2024" },
  { id: 6, nomeProduto: "Amortecedor dianteiro", quantidade: 2, valorUnidade: 310.00, cliente: { nome: "Eduardo Pereira", cpf: "741.852.963-66" }, data: "22/11/2024" },
  { id: 7, nomeProduto: "Correia dentada", quantidade: 1, valorUnidade: 180.00, cliente: { nome: "Bruno Martins", cpf: "159.753.486-12" }, data: "20/11/2024" },
  { id: 8, nomeProduto: "Radiador", quantidade: 1, valorUnidade: 420.00, cliente: { nome: "André Santos", cpf: "258.369.147-89" }, data: "17/11/2024" },
  { id: 9, nomeProduto: "Bateria automotiva 60Ah", quantidade: 1, valorUnidade: 480.00, cliente: { nome: "Patrícia Moreira", cpf: "963.258.741-08" }, data: "14/11/2024" },
  { id: 10, nomeProduto: "Rebinboca da Parafuseta", quantidade: 8, valorUnidade: 18.00, cliente: { nome: "Carlos Eduardo Quirino", cpf: "001.123.456.78" }, data: "12/11/2024" }
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
