const mongoose = require('mongoose')
const { Schema } = mongoose

const esquemaAlimento = new Schema({
  nombre: {
    type: String, required: true
  },
  formula: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'AlimentoItem', required: true
  }],
  fecha: {
    type: Date, default: Date.now
  },
})
esquemaAlimento.virtual('id').get(function () { return this._id.toHexString() })
esquemaAlimento.set('toJSON', { virtuals: true })

const Alimento = mongoose.model('Alimento', esquemaAlimento)
module.exports = { Alimento }