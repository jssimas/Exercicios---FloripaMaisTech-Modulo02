const fs = require("fs"); 

function lerUsuarios() { 
    try {
        const data = fs.readFileSync("usuarios.json") || [];
         return JSON.parse(data);
      } catch (error) {
        return [];
      }
    };

function gravarUsuarios(usuarios) { 
    fs.writeFileSync('usuarios.json', JSON.stringify(usuarios));
};
  
// Escreve um novo usuário no arquivo de usuários
function cadastrarUsuario(usuario) {
  const usuarios = lerUsuarios()
  const UsuarioExists = usuarios.some((u) => u.email === usuario.email);
  if (UsuarioExists) {
    throw new Error("Este email já está cadastrado.");
  }
  usuarios.push(usuario);
  gravarUsuarios(usuarios);
  return "Usuário cadastrado com sucesso!";
}


function loginUsuario(email, password) {
  const usuarios = lerUsuarios()
  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario || usuario.senha !== password) {
    throw new Error("Email ou senha inválidos.")
  }
  return "Usuário logado com sucesso!";
}

// Exclui um usuário
function excluirUsuario(email) {
  const usuarios = lerUsuarios()
  const novosUsuarios = usuarios.filter((u) => u.email !== email);

  if (novosUsuarios.length === usuarios.length) {
    throw new Error('Usuário não encontrado.');
  }

  gravarUsuarios(novosUsuarios);

  return "Usuário excluido com sucesso!";

}

module.exports = { cadastrarUsuario, loginUsuario, excluirUsuario };