var express = require('express')
const { validarId } = require('../middlewares/validar-id')
const { validarInsumo } = require('../middlewares/validar-insumo')
const { obtenerInsumos, insertarInsumo, actualizarInsumo, eliminarInsumo, obtenerInsumo } = require('../controllers/controlador-insumos')

var router = express.Router()
router.get('/', [obtenerInsumos])
router.post('/', [validarInsumo, insertarInsumo])
router.put('/:id', [validarId, validarInsumo, actualizarInsumo])
router.delete('/:id', [validarId, eliminarInsumo])
router.get('/:id', [validarId, obtenerInsumo])

module.exports = router
// Language: javascript
// Path: routes\insumos.js
