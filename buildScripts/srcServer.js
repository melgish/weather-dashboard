/* eslint-disable no-console */
import path from 'path';
import fs from 'fs';
import https from 'https';
import chalk from 'chalk';
import express from 'express';
import history from 'connect-history-api-fallback';
import morgan from 'morgan';
// import compression from 'compression';
import open from 'open';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';
import api from '../server/api';
import env from '../server/env';

const app = express();

if (env.logLevel !== 'none') {
  app.use(morgan(env.logLevel));
}
const compiler = webpack(webpackConfig);

// app.use(compression());
app.use('/api', api);
// serve coverage results to help develop unit tests
app.use('/coverage',
  express.static(path.resolve('./coverage/www')));
// webpack
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  stats: {
    chunks: false,
    colors: false,
  },
}));
app.use(webpackHotMiddleware(compiler, {
  path: '/__webpack_hmr',
}));
app.use(history());

if (env.pfx) {
  // security has been configured
  https.createServer({
    pfx: fs.readFileSync(env.pfx),
    passphrase: env.passphrase
  }, app).listen(env.port, env.host, () => {
    console.log(chalk.green('SSL has been configured.'));
    console.log('Listening:', chalk.green([env.host, env.port].join(':')));
    open('https://localhost:' + env.port + '/coverage');
    open('https://localhost:' + env.port);
  });
} else {
  // security has not been configured
  app.listen(env.port, env.host, () => {
    console.log('WARNING:', chalk.yellow('SSL has not been configured.'));
    console.log('Listening:', chalk.green([env.host, env.port].join(':')));
    open('http://localhost:' + env.port + '/coverage');
    open('http://localhost:' + env.port);
  });
}

export default app;
