/* eslint-disable no-console */
import path from 'path';
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

const app = express();
const port = process.env.APP_PORT || 3000
const host = process.env.APP_HOST || '0.0.0.0';
const logLevel = process.env.APP_LOGLEVEL || 'dev';

if (logLevel !== 'none') {
  app.use(morgan(logLevel));
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
app.listen(port, host, () => {
  console.log('Listening on', chalk.green([host, port].join(':')));
  open('http://' + host + ':' + port + '/coverage');
  open('http://' + host + ':' + port);
});

export default app;
