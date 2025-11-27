# Projeto: JDM King Autopeças

## Sistema automotivo - Sistema de serviços e peças de carros

### Como funciona o fluxo de atendimento na loja autopeças?

As 4 perguntas mais importantes do projeto estão abaixo:

1. O que o cliente precisa?
O cliente relata o problema do veículo. Logo após isso, o mecânico é acionado. O cliente também pode entrar na loja sabendo o produto que ele quer comprar, e isso não é um serviço, é uma compra de peça avulso.

2. Se o cliente quiser um produto?
O atendimento faz uma pesquisa do produto, se há disponibilidade, informa o valor ao cliente. O cliente aceitando o valor, o fluxo de atendimento começa aqui. 

É necessário solicitar informações pessoais do cliente para saber se ele possui cadastro, se não, faremos o cadastro. O cliente possuindo cadastro, o atendimento vai na guia Vendas e cria uma ordem de compra. A ordem de compra vai juntar o nome do cliente e o produto. A ordem de compra começa clicando no botão Criar ordem de compra, e finaliza com o botão salvar.

O cliente não possui cadastro, será feito o cadastro na guia Clientes e depois o atendimento retorna à guia Vendas.

3. Se o cliente quiser serviço?

O atendimento vai na guia Serviços e cria uma ordem de serviço. Os serviços existirão em uma lista, ou seja, não será necessário criar um serviço novo. O novo serviço vai vincular o cliente (com os dados do carro), nome do serviço e as peças utilizadas/substituídas. Depois, salvar o serviço criado.

Fluxo real (complexo): Mecânico > diagnóstico > orçamento > volta para o cliente

4. O que acontece com o Estoque quando o cliente compra uma peça avulso (guia Vendas) ou realiza um serviço com instalação ou troca de peça?

O estoque é o decréscimo ou acréscimo de quantidade das peças da loja de autopeças. Quando o cliente compra uma peça avulso na guia de Vendas, ocorrerá um decréscimo da quantidade da peça em questão. A mesma coisa ocorre no serviço quando o mecânico vai utilizar uma peça do estoque, seja para instalar, seja para trocar.

### O fluxo abaixo é apenas um esboço (será finalizado até 15 de dezembro de 2025)

![Fluxograma do projeto](../jdm-king-autopecas/assets/fluxograma/Fluxo%20de%20atendimento%20da%20autopeças.png)