const fs = require('fs');

// specifies PORT app will listen on. Default 62865

/**
 * Return first potential with a value
 * @param {string[]} values array of possible values
 */
function firstEnv(...values) {
  return values.find(v => undefined !== v) || undefined;
}

/**
 * Return contents of first non-empty file
 * @param {string[]} values array of possible file name(s)
 */
function firstFile(...values) {
  return values.reduce(
    (a, v) => a || v && fs.existsSync(v) && fs.readFileSync(v)
  ) || undefined;
}



/**
 * Identifies port for express to listen on
 * default: 62568
 */
exports.port = firstEnv(
    process.env.APP_PORT,
    process.env.npm_package_config_port,
    62568
);

/**
 * Identifies network adapter for express to listen on
 * default: 0.0.0.0
 */
exports.host = firstEnv(
  process.env.APP_HOST,
  process.env.npm_package_config_host,
  '0.0.0.0'
);

/**
 * Sets express logging level.
 * default: tiny
 */
// specifies logLevel for morgan. Default 'tiny'
exports.logLevel = firstEnv(
  process.env.APP_LOGLEVEL,
  process.env.npm_package_config_logLevel,
  'tiny'
);

/**
 * Sets accuweather API key.
 * default: none
 */
exports.apikey = firstEnv(
  process.env.APP_APIKEY,
  process.env.npm_package_config_apikey
);

const pfx = firstFile(
  process.env.SSL_PFX,
  process.env.npm_package_config_ssl_pfx
);

const passphrase = firstFile(
  process.env.SSL_PASSPHRASE,
  process.env.npm_package_config_ssl_passphrase
);

exports.ssl = pfx && { pfx, passphrase };
