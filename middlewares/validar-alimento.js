const createError = require('http-errors')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

function validarAlimento(req, res, next) {
  const { error } = Joi.object({
    nombre: Joi.string().required(),
    formula: Joi.array().items({
      insumo: Joi.objectId().required(),
      cantidad: Joi.number().required()
    }).default([])
  }).validate(req.body)
  if (error) { next(createError(400, error)) }
  next()
}

module.exports = { validarAlimento }