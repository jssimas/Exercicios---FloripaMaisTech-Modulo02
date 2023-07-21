
function verificaParouImpar() {
  const numero = parseInt(prompt("Digite um número:"));

  if (numero % 2 === 0) {
    console.log("O número é par.");
  } else {
    console.log("O número é ímpar.");
  }
}

function verificaGruposIdade() {
  const idade = parseInt(prompt("Qual é a sua idade?"));

  if (idade < 0 || idade > 110) {
    console.log("Idade inválida!");
  } else if (idade <= 12) {
    console.log("Criança");
  } else if (idade <= 17) {
    console.log("Adolescente");
  } else if (idade <= 65) {
    console.log("Adulto");
  } else {
    console.log("Sênior");
  }
}

function verificaPonte() {
  const peso = parseFloat(prompt("Qual é o peso do carro em kg?"));
  const comprimento = parseFloat(prompt("Qual é o comprimento do carro em metros?"));

  if (peso <= 1500 && comprimento <= 5) {
    console.log("O carro pode passar pela ponte.");
  } else {
    console.log("O carro não pode passar pela ponte.");
  }
}

function verificaClassificacao() {
const valorPedido = parseFloat(prompt("Qual é o valor do pedido?"));

if (valorPedido <= 10000) {
  console.log("Classificação: Bronze");
} else if (valorPedido > 10000 && valorPedido <= 50000) {
  console.log("Classificação: Prata");
} else if (valorPedido > 50000 && valorPedido <= 500000) {
  console.log("Classificação: Ouro");
} else {
  console.log("Classificação: Platinum");
}
}

function verificaMaior() {
  const valor1 = parseFloat(prompt("Digite o primeiro valor:"));
  const valor2 = parseFloat(prompt("Digite o segundo valor:"));
  
  if (valor1 > valor2) {
    console.log(`O maior valor é: ${valor1}`);
  } else {
    console.log(`O maior valor é: ${valor2}`);
  }
}

function confirmarAcao() {
  if (confirm("Tem certeza de que deseja avaliar a página?")) {
    alert("Obrigado por confirmar!");
  } else {
    alert("Fica para próxima, obrigado!");
  }
}

function pedirInformacoes() {
  var nome = "";
  var cidade = "";
  nome = window.prompt("Qual o seu nome?");
  cidade = window.prompt("Qual a sua cidade?");
  var idade = parseInt(prompt("Digite sua idade."));
  console.log(nome, cidade, idade);
}


function pedirNomeSobrenome() {
  var nome = "";
  var sobrenome = "";
  nome = window.prompt("Qual o seu nome?");
  sobrenome = window.prompt("Qual o seu sobrenome?");
  alert("Bem-vindo, " + nome + ' ' + sobrenome + "!");
}

