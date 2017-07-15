![travis](https://travis-ci.org/melgish/weather-dashboard.svg?branch=develop)

Note: You need an accuweather api key to use this software.

Configure api key using environment variable:
```
cross-env APP_APIKEY=key npm run server
```

or by using npm config:

```
npm config --global set @njf/weather-dashboard:apikey your-api-key-here
```
# Environment Settings
  + `APP_APIKEY` accuweather api key
  + `APP_HOST` host to listen on, default `0.0.0.0`
  + `APP_PORT` port to listen on, default `3000`
  + `APP_LOGLEVEL` morgan logging level or `none` to disable logging.
  + `SSL_PFX` fully qualified path to PFX file.
  + `SSL_PASSPHRASE` password for PFX file.
