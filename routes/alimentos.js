var express = require('express')
const { validarId } = require('../middlewares/validar-id')
const { validarAlimento } = require('../middlewares/validar-alimento')
const { obtenerAlimentos, insertarAlimento, actualizarAlimento, eliminarAlimento, obtenerAlimento } = require('../controllers/controlador-alimentos')

var router = express.Router()
router.get('/', [obtenerAlimentos])
router.post('/', [validarAlimento, insertarAlimento])
router.put('/:id', [validarId, validarAlimento, actualizarAlimento])
router.delete('/:id', [validarId, eliminarAlimento])
router.get('/:id', [validarId, obtenerAlimento])

module.exports = router