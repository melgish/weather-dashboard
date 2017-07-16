/* eslint-disable no-console */
import path from 'path';
import https from 'https';
import chalk from 'chalk';
import express from 'express';
import history from 'connect-history-api-fallback';
import morgan from 'morgan';
import compression from 'compression';
import env from '../server/env';
import api from '../server/api';

const app = express();

if (env.logLevel !== 'none') {
  app.use(morgan(env.logLevel));
}
app.use(compression());
app.use('/api', api);
app.use(express.static(path.resolve(__dirname, '..', 'dist')));
app.use(history());

if (env.ssl) {
  // security has been configured
  https.createServer(env.ssl, app).listen(env.port, env.host, () => {
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

export default app;
