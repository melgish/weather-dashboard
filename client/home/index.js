import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import weather from '../weather';
import template from './template.pug';

export function locationResolver(weather) {
  'ngInject';
  return weather.getLocation(32934);
}

export function conditionsResolver(weather, location) {
  'ngInject';
  return weather.getConditions(location.Key);
}

export function forecastResovler(weather, location) {
  'ngInject';
  return weather.getForecast(location.Key);
}

export function routeConfig($stateProvider, $urlServiceProvider) {
    'ngInject';
    $stateProvider.state('home', {
      url: '/',
      component: 'home',
      resolve: {
        location: locationResolver,
        conditions: conditionsResolver,
        forecast: forecastResovler,
      },
    });
    $urlServiceProvider.rules.initial({ state: 'home' });
}

export default angular
  .module('app.home', [uiRouter, weather])
  .component('home', {
    template: template,
    bindings: {
      location: '<',
      conditions: '<',
      forecast: '<',
    },
  })
  .config(routeConfig)
  .name;
