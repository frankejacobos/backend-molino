const { AlimentoItem } = require('../models/alimento-item')
const { Produccion } = require('../models/produccion')
const { Alimento } = require('../models/alimento')
const { Insumo } = require('../models/insumo')
const createError = require('http-errors')

async function obtenerProducciones(req, res, next) {
  try {
    let producciones = await Produccion.find()
    res.status(200).json(producciones)
  }
  catch (error) {
    next(createError(400, 'Error al obtener las producciones'))
  }
}
async function obtenerProduccionesPorFecha(req, res, next) {
  try {
    let producciones = await Produccion.find({ fecha: { $gte: req.params.fechaInicio, $lte: req.params.fechaFin } })
    res.status(200).json(producciones)
  }
  catch (error) {
    next(createError(400, 'Error al obtener las producciones'))
  }
}
async function obtenerProduccionesHoy(req, res, next) {
  try {
    let producciones = await Produccion.find({ fecha: { $gte: new Date(new Date().setHours(0, 0, 0, 0)), $lte: new Date(new Date().setHours(23, 59, 59, 999)) } })
    res.status(200).json(producciones)
  }
  catch (error) {
    next(createError(400, 'Error al obtener las producciones'))
  }
}
async function insertarProduccion(req, res, next) {
  await Alimento.findById(req.body.alimento)
    .then(async (alimento) => {
      req.body.nombre = alimento.nombre
      req.body.precioPorTonelada = 0
      return await Promise.all(alimento.formula.map(async (id) => {
        return await AlimentoItem.findById(id)
      }))
    })
    .then(async (alimentoItems) => {
      await Promise.all(alimentoItems.map(async (alimentoItem) => {
        let insumo = await Insumo.findByIdAndUpdate(alimentoItem.insumo, { $inc: { stock: -alimentoItem.cantidad } })
        req.body.precioPorTonelada += alimentoItem.cantidad * insumo.precio
      }))
    })
    .then(async () => {
      let produccion = new Produccion(req.body)
      produccion = await produccion.save()
      res.status(200).json(produccion)
    })
    .catch((error) => { return next(createError(400, 'Error al insertar la produccion')) })
}
async function eliminarProduccion(req, res, next) {
  let produccion
  await Produccion.findByIdAndRemove(req.params.id)
    .then(async (produccion) => {
      produccion = produccion
      return await Alimento.findById(produccion.alimento)
    })
    .then(async (alimento) => {
      return await Promise.all(alimento.formula.map(async (id) => {
        return await AlimentoItem.findById(id)
      }))
    })
    .then(async (alimentoItems) => {
      await Promise.all(alimentoItems.map(async (alimentoItem) => {
        await Insumo.findByIdAndUpdate(alimentoItem.insumo, { $inc: { stock: alimentoItem.cantidad } })
      })) 
    })
    .catch((error) => { return next(createError(400, 'Error al eliminar la produccion')) })
  res.status(200).json(produccion)
}
async function obtenerProduccion(req, res, next) {
  try {
    let produccion = await Produccion.findById(req.params.id)
    res.status(200).json(produccion)
  }
  catch (error) {
    next(createError(400, 'Error al obtener la produccion'))
  }
}

module.exports = { obtenerProducciones, obtenerProduccionesPorFecha, obtenerProduccionesHoy, insertarProduccion, eliminarProduccion, obtenerProduccion }