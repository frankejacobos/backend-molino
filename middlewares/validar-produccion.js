const createError = require('http-errors')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

function validarProduccion(req, res, next) {
  const { error } = Joi.object({
    alimento: Joi.objectId().required(),
    cantidad: Joi.number().required().min(0),
  }).validate(req.body)
  if (error) { next(createError(400, error)) }
  next()
}

module.exports = { validarProduccion }