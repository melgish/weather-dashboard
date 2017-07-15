// specifies PORT app will listen on. Default 62865
exports.port = process.env.APP_PORT =
  process.env.APP_PORT || process.env.npm_package_config_port || 62568;

// specifies network app will listen on. Default localhost.  For all 0.0.0.0
exports.host = process.env.APP_HOST =
  process.env.APP_HOST || process.env.npm_package_config_host || 'localhost';

// specifies logLevel for morgan. Default 'tiny'
exports.logLevel = process.env.APP_LOGLEVEL =
  process.env.APP_LOGLEVEL || process.env.npm_package_config_logLevel || 'tiny';

// specifies accuweather API key. (no default)
exports.apikey = process.env.APP_APIKEY =
  process.env.APP_APIKEY || process.env.npm_package_config_apikey;

// specifies SSL cert file. (no default)
exports.pfx = process.env.SSL_PFX =
  process.env.SSL_PFX || process.env.npm_package_config_ssl_pfx;

// specifies SSL passphrase. (no default)
exports.passphrase = process.env.SSL_PASSPHRASE =
  process.env.SSL_PASSPHRASE || process.env.npm_package_config_ssl_passphrase
