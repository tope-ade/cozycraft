
require('dotenv').config();
const { mkdir } = require('fs');
const pino = require('pino');

//create a transport
const transport = pino.transport({
  targets : [
  {
   target : 'pino-pretty',
   options : {destination : './log/output.log', mkdir : true} //stores in logs
  },
  {
   target : 'pino-pretty',
   options : {destination : process.stdout.fd} //displays in terminal
  }
  ]
})

//create a logger instance
const logger = pino({
  customLevels : {catastrophe: 70},
  level : process.env.PINO_LOG_LEVEL || 'info'
}, transport)

module.exports = logger;