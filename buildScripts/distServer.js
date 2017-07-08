/* eslint-disable no-console */
import chalk from 'chalk';
import express from 'express';
import history from 'connect-history-api-fallback';
import morgan from 'morgan';
import path from 'path';
import compression from 'compression';
import api from '../server/api';

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
app.listen(port, host, () => {
  console.log('Listening on', chalk.green([host, port].join(':')));
});

export default app;
