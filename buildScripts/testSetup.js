// This file isn't transpiled, so must use CommonJS / ES5

// Register babel to transpile before tests run
require('babel-register')();

// Disable webpack features that test framework doesn't understand.
require.extensions['.css'] = function() {};
