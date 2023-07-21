function separadorDeNumeros(arrayDeNumeros, opcao) {
    var numerosImpares = array.filter(numero => arrayDeNumeros % 2 !== 0);
    var numerosPares = array.filter(numero => arrayDeNumeros % 2 === 0);

    switch (opcao) {
        case 1:
          return numerosImpares;
        case 2:
          return numerosPares;
        case 3:
          var resultado = {
            impares: numerosImpares,
            pares: numerosPares
          };
          return resultado;
        default:
          return "Opção inválida!";
      }
    }
  
  module.exports = separadorDeNumeros