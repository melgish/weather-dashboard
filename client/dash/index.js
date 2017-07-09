import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import weather from '../weather';
import template from './template.pug';

/**
 * Get current location info from zipCode
 * @param {*} $transition$ ui-router transition service
 * @param {*} weather REST api
 */
export function locationResolver($transition$, weather) {
  'ngInject';
  const to = $transition$.params('to');
  return weather.getLocation(to.zip);
}

/**
 * Get weather for current conditions
 * @param {*} weather REST api
 * @param {*} location weather api location results
 */
export function conditionsResolver(weather, location) {
  'ngInject';
  return weather.getConditions(location.Key);
}

/**
 * Get 5 day forcast
 * @param {*} weather REST api
 * @param {*} location weather api location results
 */
export function forecastResovler(weather, location) {
  'ngInject';
  return weather.getForecast(location.Key);
}

/**
 * Configure application routing for dash
 * @param {*} $stateProvider ui-router state configuration
 */
export function routeConfig($stateProvider) {
    'ngInject';
    $stateProvider.state('weather', {
      component: 'dash',
      resolve: {
        location: locationResolver,
        conditions: conditionsResolver,
        forecast: forecastResovler,
      },
    })
    $stateProvider.state('weather.zip', {
      url: '/{zip:[0-9]{5}}',
    });
    $stateProvider.state('weather.geo', {
      url: '/{lat:[0-9.]},{lng:[0-9.]}',
    });
}

export default angular
  .module('app.dash', [uiRouter, weather])
  .component('dash', {
    template: template,
    bindings: {
      location: '<',
      conditions: '<',
      forecast: '<',
    },
  })
  .config(routeConfig)
  .name;
