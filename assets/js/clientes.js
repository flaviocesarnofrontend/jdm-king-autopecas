let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
const listaVeiculos = document.getElementById("listaVeiculos");
const btnAdd = document.getElementById("btnAddVeiculo");

let veiculosTemp = [];
let clienteEditando = null;

btnAdd?.addEventListener("click", () => {
    const modelo = document.getElementById("campoModelo").value.trim();
    const placa = document.getElementById("campoPlaca").value.trim().toUpperCase();

    if (!modelo || !placa) {
        alert("Preencha modelo e placa!");
        return;
    }

    // veiculosTemp.push({ modelo, placa });
    //agora os veículos possuem ID, isso ajuda na integração com a página de serviços
    veiculosTemp.push({
        id: Date.now() + Math.floor(Math.random() * 1000), // id único
        modelo,
        placa
    });

    const item = document.createElement("div");
    item.classList.add("badge-veiculo");
    item.innerHTML = `${modelo} - ${placa}`;

    listaVeiculos.appendChild(item);

    document.getElementById("campoModelo").value = "";
    document.getElementById("campoPlaca").value = "";
});

const form = document.getElementById("formNovoCliente");

form?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (veiculosTemp.length === 0) {
        alert("Adicione pelo menos um veículo!");
        return;
    }

    if(clienteEditando){
        const index = clientes.findIndex(c => c.id == clienteEditando.id);
        if (index !== -1) {
            clientes[index] = {
                id: clienteEditando.id,
                nome: e.target.nome.value,
                cpf: e.target.cpf.value,
                telefone: e.target.telefone.value,
                email: e.target.email.value,
                veiculos: veiculosTemp
            };
        }
        
        alert("Cliente atualizado com sucesso!")
        clienteEditando = null;
        modal.close();
        exibirDados(clientes);

        //localStorage.setItem("clientes", JSON.stringify(clientes)); 
        
        //return;
    }else{
        const dados = {
            id: clientes.length + 1,
            nome: e.target.nome.value,
            cpf: e.target.cpf.value,
            telefone: e.target.telefone.value,
            email: e.target.email.value,
            veiculos: veiculosTemp
        };
        clientes.push(dados);
        alert("Cliente cadastrado com sucesso!");

    }

    localStorage.setItem("clientes", JSON.stringify(clientes));
    
    modal.close();
    if(clientes.length > 0){
        veiculosTemp = [];
        form.reset();
        modal.close();

        exibirDados(clientes);
    }
    window.location.href = "clientes.html";
});

function exibirDados(dados) {
    //console.log("Clientes do localStorage:", clientes);

    const container = document.querySelector(".cartoes");
    container.innerHTML = "";

    dados.forEach(cliente => {
        const card = document.createElement("div");
        card.classList.add("cartao");

        card.innerHTML = `
        <div class="cartao-container-cliente">
            <div>
                <p class="cartao-nome">${cliente.nome}</p>
                <p class="cartao-cpf">CPF:${cliente.cpf}</p>
                <p class="cartao-tel">
                    <img src="../assets/img/clientes/telefone-icon.svg" alt="">
                    ${cliente.telefone}
                </p>
                <p class="cartao-email">
                    <img src="../assets/img/clientes/mail-icon.svg" alt="">
                    ${cliente.email}
                </p>
            </div>
            <div class="cartao-editar-excluir">
                <a href="#"><img data-id="${cliente.id}" class="cartao-editar" 
                    src="../assets/img/clientes/edit-icon.svg" alt=""></a>

                <a href="#" class="btn-excluir" data-id="${cliente.id}">
                    <img class="cartao-excluir" src="../assets/img/clientes/delete-icon.svg" alt="">
                </a>
            </div>
        </div>
        <div>
            <p class="cartao-veiculos">
                <img src="../assets/img/clientes/car-icon.svg" alt="">
                Veículos
            </p>
            <div class="container-veiculos"></div>
        </div>
        `;

        const veiculosContainer = card.querySelector(".container-veiculos");

        cliente.veiculos.forEach(v => {
            const item = document.createElement("div");
            item.classList.add("cartao-veiculo");

            item.innerHTML = `
                <p class="cartao-nome-veiculo">${v.modelo}</p>
                <p class="cartao-placa">${v.placa}</p>
            `;
            veiculosContainer.appendChild(item);
            
        });

        container.appendChild(card);
        
    });

    const botoesExcluir = document.querySelectorAll(".btn-excluir");

    botoesExcluir.forEach(botao => {
        botao.addEventListener("click", (e) => {
            e.preventDefault();

            const id = botao.getAttribute("data-id");

            if (confirm("Deseja realmente excluir este cliente?")) {
                excluirDados(id);
            }
        });

    });

    adicionarEventoEdicao();
}


function excluirDados(id){
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    const armazenados = JSON.parse(localStorage.getItem("clientes")) || [];

    clientes = armazenados.filter(c => c.id != id);

    localStorage.setItem("clientes", JSON.stringify(clientes));
    exibirDados(clientes);
}

const inputBusca = document.getElementById("busca");
inputBusca.addEventListener("input", () =>{
    const termo = inputBusca.value.toLowerCase().trim();

    const filtrados = clientes.filter(c =>
        c.nome.toLowerCase().includes(termo) ||
        c.cpf.toLowerCase().includes(termo) ||
        c.telefone.toLowerCase().includes(termo)
    );
    exibirDados(filtrados);
})

exibirDados(clientes)


function adicionarEventoEdicao(){
    const botoesEditar = document.querySelectorAll(".cartao-editar");

    botoesEditar.forEach(botao => {
        botao.addEventListener("click", () => {
            const id = botao.getAttribute("data-id");
    
            clienteEditando = clientes.find(c => c.id == id);
    
            if(!clienteEditando) return;
    
            form.nome.value = clienteEditando.nome;
            form.cpf.value = clienteEditando.cpf;
            form.telefone.value = clienteEditando.telefone;
            form.email.value = clienteEditando.email;
    
            veiculosTemp = [...clienteEditando.veiculos];
            listaVeiculos.innerHTML = "";
    
            veiculosTemp.forEach(v => {
                const item = document.createElement("div");
                item.classList.add("badge-veiculo");
                // item.innerText = `${v.veiculos} - ${v.placa}`;
                item.innerText = `${v.modelo} - ${v.placa}`;
                listaVeiculos.appendChild(item);
            });
            modal.showModal();
        });
    });
}
const modal = document.getElementById("myModal");
// const openModalBtn = document.getElementById("novoCliente"); //aqui chamou a div e nao o button de fato
const openModalBtn = document.getElementById("btn-cadastro-novo-cliente");
const closeModalBtn = document.getElementById("closeButton");
const editOpenModalBtn = document.getElementsByClassName("cartao-editar")[0];

// modal.showModal(); //excluir depois

document.getElementById("novoCliente").addEventListener("click", () => {
    document.getElementById("formNovoCliente").reset();
    veiculosTemp = [];
});

openModalBtn.addEventListener("click", () => modal.showModal());
closeModalBtn.addEventListener("click", () => modal.close());
// editOpenModalBtn.addEventListener("click", (event) => {
//     modal.showModal()
// console.log(event.target)
// });

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.close();
  }
});




