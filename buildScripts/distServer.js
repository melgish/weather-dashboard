/* eslint-disable no-console */
import chalk from 'chalk';
import express from 'express';
import history from 'connect-history-api-fallback';
import morgan from 'morgan';
import path from 'path';
import compression from 'compression';
import api from '../server/api';

const app = express();
const port = process.env.APP_PORT || 80;
const host = process.env.APP_HOST || 'localhost';

app.use(morgan('tiny'));
app.use(compression());
app.use('/api', api);
app.use(express.static(path.resolve(__dirname, '..', 'dist')));
app.use(history());
app.listen(port, host, () => {
  console.log('Listening on', chalk.green([host, port].join(':')));
});

export default app;
