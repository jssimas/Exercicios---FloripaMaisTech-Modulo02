const axios = require("axios"); 

async function buscaEnderecoViaCep(cep) {
 
  const url = `https://viacep.com.br/ws/${cep}/json/`; 
  try {
    const resposta = await axios.get(url); 
    const { logradouro, complemento, bairro, localidade, uf } = resposta.data; 
    return { logradouro, complemento, bairro, cidade: localidade, uf }; 
  } catch (erro) {
    if (erro.response && erro.response.status === 404) {
      throw new Error("CEP não encontrado"); 
    } else {
      throw erro;
    }
  }
}

module.exports = buscaEnderecoViaCep; 