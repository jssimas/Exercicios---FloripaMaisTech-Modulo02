
const { cadastrarUsuario, loginUsuario, excluirUsuario } = require('./gerenciadorUsuarios');

// Cadastrar um novo usuário
const novoUsuario = {
  nome: "Teste exclusão",
  email: "teste@gmail.com",
  senha: "123456",
};

try {
    cadastrarUsuario(novoUsuario);
    console.log('Usuário cadastrado com sucesso!');
  } catch (error) {
    console.error(error.message);
  }

// Fazer login com um usuário existente
const email = "teste@gmail.com";
const senha = "123456";

const resultadoLogin = loginUsuario(email, senha);
console.log(resultadoLogin);

// Excluir um usuário 
const resultadoExclusao = excluirUsuario(email);
console.log(resultadoExclusao);

