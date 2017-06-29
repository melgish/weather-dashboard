/* eslint-disable no-console */
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
const port = process.env.APP_PORT || 80;
const host = process.env.APP_HOST || 'localhost';
const compiler = webpack(webpackConfig);


app.use(morgan('dev'));
// app.use(compression());
app.use('/api', api);
// static
// webpack
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
  }
}));
app.use(webpackHotMiddleware(compiler, {
  path: '/__webpack_hmr',
}));
app.use(history());
app.listen(port, host, () => {
  console.log('Listening on', chalk.green([host, port].join(':')));
  open('http://' + host + ':' + port);
  open('http://' + host + ':' + port + '/coverage');
});

export default app;
