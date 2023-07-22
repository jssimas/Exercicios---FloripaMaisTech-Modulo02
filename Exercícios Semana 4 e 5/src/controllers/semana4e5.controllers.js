
const fs = require('fs');

class Semana4e5Controller {
  
  async ordenandoItens(request,response) {
    try {
      const {list, nome1, nome2} = request.body

      if (!list || !Array.isArray(list) || list.length === 0) {
        response.status(400).send({ message: "A lista precisa ter no mínimo 1 elemento"})
      }

      const newList = list.slice();

      const indiceAleatorio = Math.floor(Math.random() * (newList.length - 1)) + 1;

      const itemsalvo = newList[0];
      newList[0] = newList[indiceAleatorio];
      newList[indiceAleatorio] = itemsalvo;

      const newListNomeTopo = list.slice();
      
      const indiceNome1 = newListNomeTopo.indexOf(nome1);
      const indiceNome2 = newListNomeTopo.indexOf(nome2);

      if (indiceNome1 === -1 || indiceNome2 === -1) {
        response.status(400).send({ message: "Um dos nomes informados não foi encontrato na Lista."})
        return list;
      }

      const itemsalvo2 = newListNomeTopo[indiceNome1];
      newListNomeTopo[indiceNome1] = newListNomeTopo[indiceNome2];
      newListNomeTopo[indiceNome2] = itemsalvo2;
  

      response.status(200).send({ oldList: list, newList: newList, listNameTopo: newListNomeTopo})
     
    } catch (error) {
      response.status(500).send(error)
    }
  }
  
  async gerandoDatas(request, response) {
    try {
      const mes = parseInt(request.params.mes);

      if (isNaN(mes) || mes < 1 || mes > 12) {
        return response.status(400).json({ error: 'O mês selecionado não existe.' });
      }

      const anoCorrente = new Date().getFullYear();
      const dtInicial = new Date(anoCorrente, mes - 1, 1);
      const dtFinal = new Date(anoCorrente, mes, 0);

      const listaDatas = [];

      for (let data = dtInicial; data <= dtFinal; data.setDate(data.getDate() + 1)) {
        const formattedDate = `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`;
        listaDatas.push(formattedDate);
      }

      response.status(200).send({"datelist": listaDatas})

    } catch (error){
      response.status(400).send(error)
    }
  }
  
  async insertItem(request, response) {
    const { item } = request.body
    const fileName = "src/data/itens.json"

    if (!item){
      return response.status(400).send({ mensagem: 'Não foi enviado item para inclusão'})
    }

    let itens = JSON.parse(fs.readFileSync('' + fileName, 'utf-8'));

    if (!itens) {
      fs.writeFileSync('' + fileName, JSON.stringify([{ item }]))
      return response.status(200).send({
        mensagem: "Novo item adicionado", 
        dado: item
      })
    }

    itens = [...itens, {item}]
    fs.writeFileSync('' + fileName, JSON.stringify(itens))
    return response.status(200).send({
      mensagem: "Adicionou mais um item.",
      dado: item})

  }
  
  async filtrarUsuarios(request,response) {
    const fileName = "src/data/itens.json"
    let users = JSON.parse(fs.readFileSync('' + fileName, 'utf-8'));
    const { ageMin, ageMax, state, job} = request.query
    console.log(ageMin, ageMax, state, job)
    if((!ageMin) && (!ageMax) && (!state) && (!job)){
      return response.status(200).send({mensagem: users})
    }
    let usersFiltrados = users.filter(user => {
      if (ageMin && user.age >= parseInt(ageMin)) {
        return false;
      }
      if (ageMax && user.age <= parseInt(ageMax)) {
        return false;
      }
      if (state && !user.state.toLowerCase().includes(state.toLowerCase())) {
        return false;
      }
      if (job && !pessoa.job.toLowerCase().includes(job.toLowerCase())) {
        return false;
      }
      return true;
    });
    return response.status(200).send({mensagem: usersFiltrados})
  }
  
  async alterarUsuarios(request, response) {
    const {id} = request.params
    const {name, age, job, state} = request.body
    const fileName = "src/data/itens.json"
    let users = JSON.parse(fs.readFileSync('' + fileName, 'utf-8'));
    
    if((!name) && (!age) && (!state) && (!job)){
      return response.status(400).send({ mensagem: 'Nenhum dado informado para alteração.',
      erro: 400})
    }
    if (!users){
      return response.status(400).send({mensagem: "Não há arquivo para ser pesquisado ou não há usuário."})
    }

    let userExist = false
    let userUpDated = users.map((user) => {
      if (id == user.id) {
        userExist = true
        return {
          id: user.id,
          name: name ? name : user.name,
          age: age ? age : user.age,
          state:  state ? state : user.state
        }
      }
      return user
    })
    if (userExist == false){
      return response.status(401).send({ mensagem: 'Usuário inexistente.'})
    }
    fs.writeFileSync('' + fileName, JSON.stringify(userUpDated))
    return response.status(200).send({ mensagem: 'Usuário atualizado.'})

  }
  
  async excluirUsuario(request, response) {
    const {id} = request.params
    const fileName = "src/data/itens.json"
    let users = JSON.parse(fs.readFileSync('' + fileName, 'utf-8'));
    
    if (!users){
      return response.status(400).send({mensagem: "Não há arquivo para ser pesquisado ou não há usuário."})
    }

    const existUserId = users.some( user => id == user.id)

    if (!existUserId){
      return response.status(404).send({ mensagem: `Usuário com ID ${id} inexistente.`})
    }

    const usersNew = users.filter(user => id != user.id)

    fs.writeFileSync('' + fileName, JSON.stringify(usersNew))

    return response.status(200).send({ mensagem: `Usuário com ID ${id} removido.`})
  }

  async consultaUsuario(request, response) {
    const {id} = request.params
    const fileName = "src/data/itens.json"
    let users = JSON.parse(fs.readFileSync('' + fileName, 'utf-8'));
    
    if (!users){
      return response.status(400).send({mensagem: "Não há arquivo para ser pesquisado ou não há usuário."})
    }
  
    const existUserId = users.some( user => id == user.id)

    if (!existUserId){
      return response.status(404).send({ mensagem: `Usuário com ID ${id} inexistente.`})
    }

    const usersNew = users.filter(user => id == user.id)
    return response.status(200).send(
      { name: usersNew[0].name})
  }

  async convertString(request, response) {
    let { item } = request.body

    function isString(inputData) {
      return typeof inputData === 'string';
    }

    if (!item || !isString(item)) {
      return response.status(400).json({ error: 'Texto informado inválido.' });
    }

    const convertedText = item.split('')
    .map((char) => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
    .join('');

      return response.status(200).send({ item: convertedText})
  }
}
  
  module.exports = new Semana4e5Controller();