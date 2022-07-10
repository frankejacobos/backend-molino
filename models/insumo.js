const mongoose = require('mongoose')
const { Schema } = mongoose

const esquemaInsumo = new Schema({
  nombre: {
    type: String, required: true
  },
  categoria: {
    type: String, required: true
  },
  medida: {
    type: String, default: 'Kg.'
  },
  moneda: {
    type: String, default: 'S/. '
  },
  stock: {
    type: Number, default: 0, min: 0
  },
  precio: {
    type: Number, default: 0, min: 0
  }
})
esquemaInsumo.virtual('id').get(function () { return this._id.toHexString() })
esquemaInsumo.set('toJSON', { virtuals: true })

const Insumo = mongoose.model('Insumo', esquemaInsumo)
module.exports = { Insumo }