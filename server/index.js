/* eslint-disable no-console */
const chalk = require('chalk');
const express = require('express');
const history = require('connect-history-api-fallback');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');
const api = require('../server/api');

const app = express();
const port = process.env.APP_PORT || 80;
const host = process.env.APP_HOST || 'localhost';
const logLevel = process.env.APP_LOGLEVEL || 'tiny';

if (logLevel !== 'none') {
  app.use(morgan(logLevel));
}
app.use(compression());
app.use('/api', api);
app.use(express.static(path.resolve(__dirname, '..', 'dist')));
app.use(history());
app.listen(port, host, () => {
  console.log('Listening on', chalk.green([host, port].join(':')));
});

module.exports = app;
