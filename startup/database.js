const mongoose = require('mongoose')
const logger = require('../utils/logger')
require('express-async-errors')

module.exports = function () {
  const uri = "mongodb+srv://" + process.env.ROOT + ":" + process.env.PASSWORD + "@cluster0.agkgn.mongodb.net/" + process.env.DB + "?retryWrites=true&w=majority"
  mongoose.connect(uri)
    .then(() => { logger.info(process.env.DB + ' Database Connection is ready...') })
    .catch((error) => { logger.error(error) })
}