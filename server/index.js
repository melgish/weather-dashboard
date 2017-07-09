/* eslint-disable no-console */
const chalk = require('chalk');
const express = require('express');
const history = require('connect-history-api-fallback');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');
const api = require('../server/api');
const fs = require('fs');
const app = express();

const port = process.env.APP_PORT || 3000
const host = process.env.APP_HOST || '0.0.0.0';
const logLevel = process.env.APP_LOGLEVEL || 'tiny';

if (logLevel !== 'none') {
  app.use(morgan(logLevel));
}
app.use(compression());
app.use('/api', api);
app.use(express.static(path.resolve(__dirname, '..', 'dist')));
app.use(history());

if (process.env.APP_SSLKEY && process.env.APP_SSLCRT) {
  const https = require('https');
  https.createServer({
    key: fs.readFileSync(process.env.APP_SSLKEY),
    cert: fs.readFileSync(process.env.APP_SSLCRT),
  }, app).listen(port, host, () => {
    console.log(chalk.green('SSL has been configured.'));
    console.log('Listening:', chalk.green([host, port].join(':')));
  });
} else {
  app.listen(port, host, () => {
    console.log('WARNING:', chalk.yellow('SSL has not been configured.'));
    console.log('Listening:', chalk.green([host, port].join(':')));
  });
}

module.exports = app;
