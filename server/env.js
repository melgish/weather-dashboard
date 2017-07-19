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
 * Identifies port for express to listen on
 * default: 62865
 */
exports.port = firstEnv(
    process.env.APP_PORT,
    process.env.npm_package_config_port,
    62865
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

/**
 * @return {Object} ssl if configured
 */
exports.ssl = () => {
  let ssl;

  const pfx = firstEnv(
    process.env.SSL_PFX,
    process.env.npm_package_config_ssl_pfx
  );

  const secret = firstEnv(
    process.env.SSL_SECRET,
    process.env.npm_package_config_ssl_secret
  );

  if (pfx && fs.existsSync(pfx)) {
    ssl = {};
    ssl.pfx = fs.readFileSync(pfx);
    if (secret && fs.existsSync(secret)) {
      ssl.passphrase = fs.readFileSync(secret);
    }
  }

  return ssl;
};
