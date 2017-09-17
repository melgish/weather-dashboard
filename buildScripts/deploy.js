/* eslint-disable no-console */
import chalk from 'chalk';
import cp from 'copy';
import path from 'path';

function pcp(files, target, options) {
  return new Promise((resolve, reject) => {
    cp(files, target, options, (err, files) => {
      if (err) {
        return reject(err);
      }
      return resolve(files);
    });
  });
}

console.log(chalk.blue('copying files'));
Promise.all([
  pcp(
    ['dist*/**/*.*', 'server*/**/*.*', 'package*.json', 'Dockerfile'],
    path.resolve('deploy'),
    { cwd: path.resolve('.') }
  ),
  pcp(
    ['a*.p*'],
    path.resolve('deploy', 'certs'),
    { cwd: path.resolve('..', 'certs') }
  )
])
.then(values => values.reduce((a, v) => a.concat(v), []))
.then(files => console.log(chalk.green('copied', files.length, 'files')))
.catch(err => console.log(chalk.red(err)))




