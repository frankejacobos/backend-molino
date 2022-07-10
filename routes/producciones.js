var express = require('express')
const { validarId } = require('../middlewares/validar-id')
const { validarProduccion } = require('../middlewares/validar-produccion')
const { obtenerProducciones, obtenerProduccionesHoy, obtenerProduccionesPorFecha, insertarProduccion, eliminarProduccion, obtenerProduccion } = require('../controllers/controlador-produccion')

var router = express.Router()
router.get('/', [obtenerProducciones])
router.get('/hoy', [obtenerProduccionesHoy])
router.get('/fecha/:fechaInicio/:fechaFin', [obtenerProduccionesPorFecha])
router.post('/', [validarProduccion, insertarProduccion])
router.delete('/:id', [validarId, eliminarProduccion])
router.get('/:id', [validarId, obtenerProduccion])

module.exports = router
