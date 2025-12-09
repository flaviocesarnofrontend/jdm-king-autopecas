const clientesMock = [
    {
        nome: "Marcos Almeida",
        cpf: "123.456.789-10",
        telefone: "(11) 98877-1122",
        email: "marcos.almeida@email.com",
        veiculos: [
            { modelo: "Civic", placa: "ABC1D23", ano: 2018 }
        ]
    },
    {
        nome: "Juliana Pereira",
        cpf: "987.654.321-00",
        telefone: "(21) 99944-8877",
        email: "juliana.pereira@email.com",
        veiculos: [
            { modelo: "Corolla", placa: "XYZ9K88", ano: 2020 },
            { modelo: "HB20", placa: "HJK2F77", ano: 2016 }
        ]
    },
    {
        nome: "Fernando Oliveira",
        cpf: "456.789.123-55",
        telefone: "(31) 97788-6655",
        email: "fernando.oli@email.com",
        veiculos: [
            { modelo: "Onix", placa: "FFO3B29", ano: 2019 }
        ]
    },
    {
        nome: "Beatriz Ramos",
        cpf: "102.304.506-70",
        telefone: "(41) 98555-4477",
        email: "bia.ramos@email.com",
        veiculos: [
            { modelo: "Polo", placa: "RTE6D42", ano: 2021 }
        ]
    },
    {
        nome: "Lucas Martins",
        cpf: "220.110.330-09",
        telefone: "(51) 99220-5588",
        email: "lucas.martins@email.com",
        veiculos: [
            { modelo: "Fit", placa: "LUF8C11", ano: 2012 },
            { modelo: "HR-V", placa: "HVR3A55", ano: 2019 }
        ]
    },
    {
        nome: "Carla Silva",
        cpf: "332.998.112-44",
        telefone: "(62) 98144-9911",
        email: "carla.silva@email.com",
        veiculos: [
            { modelo: "Ka", placa: "CAS4G10", ano: 2017 }
        ]
    },
    {
        nome: "Roberto Nogueira",
        cpf: "778.556.223-87",
        telefone: "(71) 98888-2233",
        email: "roberto.ng@email.com",
        veiculos: [
            { modelo: "Compass", placa: "JEP7Q02", ano: 2022 }
        ]
    },
    {
        nome: "Ana Paula Moura",
        cpf: "550.443.112-66",
        telefone: "(81) 99122-7755",
        email: "ana.moura@email.com",
        veiculos: [
            { modelo: "Argo", placa: "ARG5D77", ano: 2018 }
        ]
    },
    {
        nome: "Diego Santos",
        cpf: "110.220.330-44",
        telefone: "(91) 98444-3311",
        email: "diego.santos@email.com",
        veiculos: [
            { modelo: "Gol", placa: "GOL1A99", ano: 2013 }
        ]
    },
    {
        nome: "Patrícia Costa",
        cpf: "998.776.554-21",
        telefone: "(85) 98766-4400",
        email: "patricia.costa@email.com",
        veiculos: [
            { modelo: "Creta", placa: "CRT9G40", ano: 2020 }
        ]
    }
];

if(!localStorage.getItem("clientes")){
    clientesMock.forEach((c, index) => c.id = index + 1);
    localStorage.setItem("clientes", JSON.stringify(clientesMock))

}