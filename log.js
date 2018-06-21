const bunyan = require('bunyan');
const config = require('./config');

const logConfig = Object.assign(
  {
    name: 'VCase',
    level: 'info',
  },
  config.log
);

module.exports = bunyan.createLogger(logConfig);
