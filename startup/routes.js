//Routes
const insumosRoute = require('../routes/insumos')
const alimentosRoute = require('../routes/alimentos')
const produccionesRoute = require('../routes/producciones')
const error = require('../middlewares/manejador-errores')

module.exports = function (app) {
  const api = process.env.API_URL
  app.use(`${api}/insumos`, insumosRoute)
  app.use(`${api}/alimentos`, alimentosRoute)
  app.use(`${api}/producciones`, produccionesRoute)
  app.use(error)
}