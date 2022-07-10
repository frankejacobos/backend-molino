const createError = require('http-errors')
const Joi = require('joi')

function validarInsumo(req, res, next) {
  const { error } = Joi.object({
    nombre: Joi.string().required(),
    categoria: Joi.string().required(),
    medida: Joi.string().default('Kg.'),
    moneda: Joi.string().default('S/. '),
    stock: Joi.number().default(0),
    precio: Joi.number().default(0),
  }).validate(req.body)
  if (error) { next(createError(400, error)) }
  next()
}

module.exports = { validarInsumo }