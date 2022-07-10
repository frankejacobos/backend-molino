const { Alimento } = require('../models/alimento')
const { AlimentoItem } = require('../models/alimento-item')
const createError = require('http-errors')

async function obtenerAlimentos(req, res, next) {
  try {
    let alimentos = await Alimento.find().sort({ nombre: 1 }).populate({ path: 'formula', populate: 'insumo' })
    res.status(200).json(alimentos)
  }
  catch (error) {
    next(createError(400, 'Error al obtener los alimentos'))
  }
}
async function insertarAlimento(req, res, next) {
  try {
    await crearFormula(req)
    let alimento = new Alimento(req.body)
    alimento = await alimento.save()
    res.status(200).json(alimento)
  }
  catch (error) {
    next(createError(400, 'Error al insertar el alimento'))
  }
}
async function actualizarAlimento(req, res, next) {
  try {
    await eliminarFormula(req)
    await crearFormula(req)
    let alimento = await Alimento.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(alimento)
  }
  catch (error) {
    next(createError(400, 'Error al actualizar el alimento'))
  }
}
async function eliminarAlimento(req, res, next) {
  try {
    let alimento = await Alimento.findByIdAndDelete(req.params.id)
    await eliminarFormula(req)
    res.status(200).json(alimento)
  }
  catch (error) {
    next(createError(400, 'Error al eliminar el alimento'))
  }
}
async function obtenerAlimento(req, res, next) {
  try {
    let alimento = await Alimento.findById(req.params.id).populate({ path: 'formula', populate: 'insumo' })
    res.status(200).json(alimento)
  }
  catch (error) {
    next(createError(400, 'Error al obtener el alimento'))
  }
}
async function crearFormula(req) {
  const alimentosItemIds = Promise.all(req.body.formula.map(async (alimentoItem) => {
    let temp = new AlimentoItem({ insumo: alimentoItem.insumo, cantidad: alimentoItem.cantidad })
    temp = await temp.save()
    return temp._id
  }))
  const alimentosItemIdsResueltos = await alimentosItemIds
  req.body.formula = alimentosItemIdsResueltos
}
async function eliminarFormula(req) {
  await Alimento.findById(req.params.id)
    .then(async (alimento) => {
      if (!alimento) return next(createError(404, 'Alimento no encontrado'))
      alimento.formula.map(async (alimentoItem) => {
        await AlimentoItem.findByIdAndRemove(alimentoItem)
      })
    })
}

module.exports = { obtenerAlimentos, insertarAlimento, actualizarAlimento, eliminarAlimento, obtenerAlimento }