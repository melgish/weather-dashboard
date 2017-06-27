const key = process.env.npm_package_config_apikey;
if (!key) {
  console.error('accuweather API key not found.');
  console.error('npm config set @njf/weather-dashboard:apikey {key}');
  process.exit(1);
} else {
  console.log('apikey', key);
}
module.exports = key;
