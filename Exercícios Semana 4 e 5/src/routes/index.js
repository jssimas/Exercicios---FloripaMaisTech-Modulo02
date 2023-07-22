
const  {routesFromSemana4e5} = require('./semana4e5.routes');

const { Router } = require('express');

const routes = Router();

routes.use('/api', routesFromSemana4e5());

module.exports = routes;