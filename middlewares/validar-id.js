const createError = require('http-errors')
const mongoose = require('mongoose')

function validarId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    next(createError(404, 'Id incorrecto.'))
  next()
}
module.exports = { validarId }