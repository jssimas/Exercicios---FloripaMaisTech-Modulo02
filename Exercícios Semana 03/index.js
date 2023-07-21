const http = require("http");

const fs = require("fs");

function ListarProdutos() {
  try {
    const dados = JSON.parse(fs.readFileSync("dados.json", "utf-8"));
    console.log(dados);
    return JSON.stringify(dados.produtos);
  } catch (erro) {
    return "Erro ao executar";
  }
}

function CriarProduto(novoProduto) {
  try {
    const dados = JSON.parse(fs.readFileSync("dados.json", "utf-8"));

    let produto = JSON.parse(novoProduto);
    let ultimoProduto = dados.produtos[dados.produtos.length - 1];
    produto.id = ultimoProduto.id + 1 || 1;

    dados.produtos.push(produto);
    console.log(dados);

    fs.writeFileSync("dados.json", JSON.stringify(dados));
    return "Produto cadastrado com sucesso!";
  } catch (erro) {
    return "Erro ao executar: " + erro.message;
  }
}

const servidor = http.createServer((request, response) => {

switch(req.method){
  case "GET":
   response.writeHead(200, {
          "Content-Type": "application/json; charset: utf-8;",
        });
        response.end(ListarProdutos());
        break;
  case "POST":
   let dataPost = "";
        request.on("data", (chunk) => {
          dataPost += chunk;
        });
        request.on("end", () => {
          response.writeHead(201, {
            "Content-Type": "text/plain; charset: utf-8;",
          });
          response.end(CriarProduto(dataPost));
        });
        break;
}
  });
  
  servidor.listen(3000);
  
  console.log("Servidor rodando na porta http://localhost:3000");