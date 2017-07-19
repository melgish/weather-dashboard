// require entry point for code coverage
require('./index');

// require all unit tests
const ctxt =
  require.context('.', true, /\.(spec|test|mock)\.js$/);

ctxt.keys().forEach(ctxt);
