const mongoose = require('mongoose')
const { Schema } = mongoose

const esquemaAlimentoItem = new Schema({
  insumo: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Insumo', required: true
  },
  cantidad: {
    type: String, required: true, min: 0
  }
})

const AlimentoItem = mongoose.model('AlimentoItem', esquemaAlimentoItem)
module.exports = { AlimentoItem }