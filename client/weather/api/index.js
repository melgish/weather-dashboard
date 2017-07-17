import angular from 'angular';

/**
 * Service for fetching weather
 * @param {service} $http angular ajax service
 */
export class WeatherService {
  constructor($http) {
    'ngInject';
    this.$http = $http;
  }

  getLocation(zipCode) {
    return this.$http
      .get('api/location/' + zipCode)
      .then(rs => rs.data && rs.data[0]);
  }

  getGeoLocation(lat, lng) {
    return this.$http
      .get('api/location/' + lat + ',' + lng)
      .then(rs => rs.data && rs.data[0]);
  }

  getConditions(locationKey) {
    return this.$http
      .get('api/conditions/' + locationKey)
      .then(rs => rs.data && rs.data[0]);
  }

  getForecast(locationKey) {
    return this.$http
      .get('api/forecast/' + locationKey)
      .then(rs => rs.data);
  }

  getIconURL(icon) {
    if (Number(icon)) {
      return 'api/icon/' + Number(icon);
    }
  }
}

export default angular
  .module('app.weather.api', [])
  .service('weather', WeatherService)
  .name;

