const request = require('request');
const apikey = require('./apikey');

const host = 'dataservice.accuweather.com';

class AccuweatherAPI {
  constructor(host, apikey) {
    this.apikey = apikey;
    this.host = host;
  }

  /**
   * Get location information for supplied zip code
   * @param {number|string} zipCode 5 digit zip code
   * @return {stream} stream with response
   */
  getLocation(zipCode) {
    return request.get({
      url: `https://${this.host}/locations/v1/postalcodes/search`,
      qs: {
        apikey: this.apikey,
        language: 'en-us',
        details: true,
        q: zipCode,
      },
    });
  }

  /**
   * Get current conditions for supplied location
   * @param {string} locationKey accuweather location key
   */
  getConditions(locationKey) {
    return request.get({
      url: `https://${this.host}/currentconditions/v1/${locationKey}`,
      qs: {
        apikey: apikey,
        language: 'en-us',
        details: true,
      },
    });
  }

  getForecast(locationKey) {
    return request.get({
      url: `https://${this.host}/forecasts/v1/daily/5day/${locationKey}`,
      qs: {
        apikey: apikey,
        language: 'en-us',
        details: true,
        metric: false,
      },
    })
  }
}

module.exports = new AccuweatherAPI(host, apikey);
