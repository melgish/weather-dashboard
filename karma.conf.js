// Karma configuration
// Generated on Tue Jun 27 2017 21:22:05 GMT-0400 (Eastern Daylight Time)
require('babel-register')();
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      // include main for coverage
      'client/unit-tests.js',
    ],
    exclude: [
    ],
    preprocessors: {
      'client/**/*.js': ['webpack']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        // { type: 'text-summary' },
        // { type: 'lcovonly', subdir: '.', file: 'lcov.info' },
        // { type: 'cobertura', subdir: '.', file: 'cobertura-coverage.xml' },
        { type: 'html', subdir: 'www' },
      ],
    },
    logLevel: config.LOG_WARN,
    webpack: require('./webpack.config.test').default,
    webpackMiddleware: {
      noInfo: true,
      stats: {
        colors: false,
        chunks: false,
      },
    },
    browsers: ['Headless'],
    singleRun: true,
    customLaunchers: {
      Headless: {
        base: 'ChromeHeadless',
        displayName: 'Headless',
        flags: [
          '--no-sandbox',
        ],
      },
    },
  })
}
