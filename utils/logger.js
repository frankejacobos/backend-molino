const { createLogger, format, transports } = require('winston');

// Import mongodb
require('winston-mongodb')
const uri = "mongodb+srv://" + process.env.ROOT + ":" + process.env.PASSWORD + "@cluster0.agkgn.mongodb.net/" + process.env.DB + "?retryWrites=true&w=majority"

module.exports = createLogger({
  transports: [
    // File transport
    new transports.File({
      filename: 'logs/file_logs.log',
      handleExceptions: true,
      handleRejections: true,
      format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
      )
    }),
    // MongoDB transport
    new transports.MongoDB({
      handleExceptions: true,
      handleRejections: true,
      //mongo database connection link
      db: uri,
      options: {
        useUnifiedTopology: true
      },
      // A collection to save json formatted logs
      collection: 'server_logs',
      format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
      )
    }),
  ],
  exitOnError: false,
});