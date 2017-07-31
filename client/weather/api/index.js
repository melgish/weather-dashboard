import angular from 'angular';

/**
 * Service for fetching weather
 * @param {service} $http angular ajax service
 */
export class WeatherService {
  constructor($http) {
    'ngInject';
    this.$http = $http;
    this.limit = '?';
    this.remaining = '?';
  }

  /**
   * Capture values from ratelimit-limit and ratelimit-remaining
   * headers if found in the response
   * @param {*} rs
   */
  _readLimitHeaders(rs) {
    let h;
    h = rs.headers('ratelimit-limit');
    if (!isNaN(h)) {
      this.limit = Number(h);
    }
    h = rs.headers('ratelimit-remaining');
    if (!isNaN(h)) {
      this.remaining = Number(h);
    }
    return rs;
  }

  /**
   * Get location information for zipCode
   * @param {number|string} zipCode 5 digit zip code
   * @return First result from location response
   */
  getLocation(zipCode) {
    return this.$http
      .get('api/location/' + zipCode, { cache: true })
      .then(rs => rs.data && rs.data[0]);
  }

  /**
   * Get location information for geo coordinates
   * @param {number} lat
   * @param {number} lng
   * @return location response
   */
  getGeoLocation(lat, lng) {
    return this.$http
      .get('api/location/' + lat + ',' + lng, { cache: true })
      .then(rs => rs.data);
  }

  getConditions(locationKey) {
    return this.$http
      .get('api/conditions/' + locationKey)
      .then(rs => this._readLimitHeaders(rs))
      .then(rs => rs.data && rs.data[0]);
  }

  getForecast(locationKey) {
    return this.$http
      .get('api/forecast/' + locationKey)
      .then(rs => this._readLimitHeaders(rs))
      .then(rs => rs.data);
  }

  getIconURL(icon) {
    if (Number(icon)) {
      return 'api/icon/' + Number(icon);
    }
  }

  getStats() {
    return this.$http
      .get('api/stats')
      .then(rs => this._readLimitHeaders(rs))
      .then(rs => rs.data);
  }
}

export default angular
  .module('app.weather.api', [])
  .service('weather', WeatherService)
  .name;

