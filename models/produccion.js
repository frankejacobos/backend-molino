const mongoose = require('mongoose')
const { Schema } = mongoose

const esquemaProduccion = new Schema({
  nombre: {
    type: String, required: true
  },
  alimento: {
    type: mongoose.Schema.Types.ObjectId,  required: true
  },
  cantidad: {
    type: Number, required: true, min: 0
  },
  precioPorTonelada: {
    type: Number, required: true, min: 0
  },
  importeTotal: {
    type: Number, required: true, min: 0
  },
  fecha: {
    type: Date, default: Date.now
  }
})

const Produccion = mongoose.model('Produccion', esquemaProduccion)
module.exports = { Produccion }