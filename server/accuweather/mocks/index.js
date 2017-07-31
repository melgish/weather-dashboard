const fs = require('fs');

/* eslint no-unused-vars: ["error", { "args": "none" }] */
class MockAPI {

  constructor() {
    /**
     * @private
     */
    this._stats = {
      limit: 50,
      remaining: 50,
    };
  }

  /**
   * Get location information for supplied zip code
   * @param {number|string} zipCode for location
   * @return {fs.ReadStream} stream with response
   */
  getLocation(zipCode) {
    this._updateStats();
    return fs.createReadStream(require.resolve('./location'));
  }

  /**
   * Get location information for supplied lat / lng
   * @param {number|string} lat latitude [-90,90]
   * @param {number|string} lng longitude [-180,180]
   */
  getGeoLocation(lat, lng) {
    this._updateStats();
    return fs.createReadStream(require.resolve('./geolocation'));
  }

  /**
   * Get current conditions for supplied location
   * @param {string} locationKey accuweather location key
   * @return {fs.ReadStream} stream with response
   */
  getConditions(locationKey) {
    this._updateStats();
    return fs.createReadStream(require.resolve('./conditions'));
  }

  /**
   * Get 5 day forecast for supplied location
   * @param {string} locationKey accuweather location key
   * @return {fs.ReadStream} stream with response
   */
  getForecast(locationKey) {
    this._updateStats();
    return fs.createReadStream(require.resolve('./forecast-5'));
  }

  /**
   * Simulate api usage
   * @private
   */
  _updateStats() {
    const s = this._stats;
    s.remaining = s.remaining -1;
    if (s.remaining <= 0) {
      s.remaining = s.limit;
    }
  }

  /**
   * Return some stats info
   * @return {Object} stats instance
   */
  getStats() {
    return this._stats;
  }
}

module.exports = new MockAPI();
