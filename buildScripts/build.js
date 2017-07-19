/*eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV =
  process.env.NODE_ENV || 'production';

console.log(chalk.blue('webpack'));

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    console.log(chalk.red(err));
    return 1;
  }

  let message;
  let output = stats.toString({
    colors: true,
    chunks: false,
    children: false,
  });

  // if (stats.hasErrors()) {
  //   stats.toJson().errors.map(error => console.error(chalk.red(error)));
  // }
  // if (stats.hasWarnings()) {
  //   stats.toJson().warnings.map(warning => console.log(chalk.yellow(warning)));
  // }

  if (stats.hasErrors()) {
    message = chalk.red('completed with errors');
  } else if (stats.hasWarnings()) {
    message = chalk.yellow('completed with warnings');
  } else {
    message = 'completed successfully';
  }

  console.log(output);
  console.log(message);

  return stats.hasErrors() ? 5 : 0;
});
