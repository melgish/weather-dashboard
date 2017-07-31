const request = require('request');
const apikey = require('./apikey');

const host = 'dataservice.accuweather.com';

class AccuweatherAPI {
  constructor(host, apikey) {
    this.apikey = apikey;
    this.host = host;

    /**
     * @private
     */
    this._stats = {
      limit: 0,
      remaining: 0
    };
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
    }).on('response', response => this._updateStats(response));
  }

  /**
   * Get current location for supplied geo-position
   * @param {*} lat
   * @param {*} lng
   */
  getGeoLocation(lat, lng) {
    return request.get({
      url: `https://${this.host}/locations/v1/cities/geoposition/search`,
      qs: {
        apikey: this.apikey,
        language: 'en-us',
        details: true,
        toplevel: true,
        q: [lat, lng].join(','),
      },
    }).on('response', response => this._updateStats(response));
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
    }).on('response', response => this._updateStats(response));
  }

  /**
   * Get 5 day forcast for supplied location key
   * @param {*} locationKey
   */
  getForecast(locationKey) {
    return request.get({
      url: `https://${this.host}/forecasts/v1/daily/5day/${locationKey}`,
      qs: {
        apikey: apikey,
        language: 'en-us',
        details: true,
        metric: false,
      },
    }).on('response', response => this._updateStats(response));
  }

  /**
   * @private
   */
  _updateStats(response) {
    let h;
    h = response.headers['ratelimit-limit'];
    if (!isNaN(h)) {
      this._stats.limit = Number(h);
    }
    h = response.headers['ratelimit-remaining'];
    if (!isNaN(h)) {
      this._stats.remaining = Number(h);
    }
    return response;
  }

  getStats() {
    return this._stats;
  }
}

module.exports = new AccuweatherAPI(host, apikey);
