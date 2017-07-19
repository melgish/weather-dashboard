/* eslint-disable no-console */
const chalk = require('chalk');
const express = require('express');
const history = require('connect-history-api-fallback');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');
const app = express();
const env = require('./env');
const api = require('./api');

if (env.logLevel !== 'none') {
  app.use(morgan(env.logLevel));
}
app.use(compression());
app.use('/api', api);
app.use(express.static(path.resolve(__dirname, '..', 'dist')));
app.use(history());

let ssl = env.ssl();
if (ssl) {
  // security has been configured
  const https = require('https');
  https.createServer(ssl, app).listen(env.port, env.host, () => {
    console.log(chalk.green('SSL has been configured.'));
    console.log('Listening:', chalk.green([env.host, env.port].join(':')));
  });
} else {
  // security has not been configured
  app.listen(env.port, env.host, () => {
    console.log('WARNING:', chalk.yellow('SSL has not been configured.'));
    console.log('Listening:', chalk.green([env.host, env.port].join(':')));
  });
}

module.exports = app;
