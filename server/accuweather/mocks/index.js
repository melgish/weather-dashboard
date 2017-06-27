const fs = require('fs');

class MockAPI {
  /**
   * Get location information for supplied zip code
   * @param {number|string} zipCode for location
   * @return {fs.ReadStream} stream with response
   */
  getLocation(zipCode) {
    zipCode;
    return fs.createReadStream(require.resolve('./location'));
  }

  /**
   * Get current conditions for supplied location
   * @param {string} locationKey accuweather location key
   * @return {fs.ReadStream} stream with response
   */
  getConditions(locationKey) {
    locationKey;
    return fs.createReadStream(require.resolve('./conditions'));
  }

  /**
   * Get 5 day forecast for supplied location
   * @param {string} locationKey accuweather location key
   * @return {fs.ReadStream} stream with response
   */
  getForecast(locationKey) {
    locationKey;
    return fs.createReadStream(require.resolve('./forecast-5'));
  }
}

module.exports = new MockAPI();
