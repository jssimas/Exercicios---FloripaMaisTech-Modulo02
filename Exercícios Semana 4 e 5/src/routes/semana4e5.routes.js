const {ordenandoItens, gerandoDatas, insertItem, filtrarUsuarios, alterarUsuarios, excluirUsuario, consultaUsuario, convertString} = require('../controllers/semana4e5.controllers');
const { Router } = require('express');

class Semana4e5Router {
    routesFromSemana4e5 () {
        const semana4e5Routes = Router()
        semana4e5Routes.patch('/ordenandoItens', ordenandoItens)
        semana4e5Routes.get('/gerandoDatas/:mes', gerandoDatas)
        semana4e5Routes.post('/insertItem', insertItem)
        semana4e5Routes.post('/filtrarUsuarios', filtrarUsuarios)
        semana4e5Routes.put('/alterarUsuarios/:id', alterarUsuarios)
        semana4e5Routes.delete('/excluirUsuario/:id', excluirUsuario)
        semana4e5Routes.get("/consultaUsuario/:id", consultaUsuario)
        semana4e5Routes.post("/convertString", convertString)
        
        return semana4e5Routes
    }
}

module.exports = new Semana4e5Router();