const { Insumo } = require('../models/insumo')
const createError = require('http-errors')

async function obtenerInsumos(req, res, next) {
  try {
    let insumos = await Insumo.find().sort({ nombre: 1 })
    res.status(200).json(insumos)
  }
  catch (error) {
    next(createError(400, 'Error al obtener los insumos'))
  }
}
async function insertarInsumo(req, res, next) {
  let insumo = new Insumo(req.body)
  try {
    await insumo.save()
    res.status(201).json(insumo)
  }
  catch (error) {
    next(createError(400, 'Error al crear el insumo'))
  }
}
async function actualizarInsumo(req, res, next) {
  try {
    let insumo = await Insumo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(insumo)
  }
  catch (error) {
    next(createError(400, 'Error al actualizar el insumo'))
  }
}
async function eliminarInsumo(req, res, next) {
  try {
    let insumo = await Insumo.findByIdAndRemove(req.params.id)
    res.status(200).json(insumo)
  }
  catch (error) {
    next(createError(400, 'Error al eliminar el insumo'))
  }
}
async function obtenerInsumo(req, res, next) {
  try {
    let insumo = await Insumo.findById(req.params.id)
    res.status(200).json(insumo)
  }
  catch (error) {
    next(createError(400, 'Error al obtener el insumo'))
  }
}

module.exports = { obtenerInsumos, insertarInsumo, actualizarInsumo, eliminarInsumo, obtenerInsumo }