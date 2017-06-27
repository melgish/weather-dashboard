import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import weather from '../weather';
import template from './template.pug';

/**
 * @param {service} $log angular logging service
 */
class HomeController {
  constructor($log) {
    'ngInject';
    this.$log = $log;
  }
}

export default angular
  .module('app.home', [uiRouter, weather])
  .component('home', {
    template: template,
    controller: HomeController,
    bindings: {
      location: '<',
      conditions: '<',
      forecast: '<',
    },
  })
  .config(($stateProvider, $urlServiceProvider) => {
    'ngInject';
    $stateProvider.state('home', {
      url: '/',
      component: 'home',
      resolve: {
        location: weather => {
          'ngInject';
          return weather.getLocation(32934);
        },
        conditions: (weather, location) => {
          'ngInject';
          return weather.getConditions(location.Key);
        },
        forecast: (weather, location) => {
          'ngInject';
          return weather.getForecast(location.Key);
        },
      },
    });
    $urlServiceProvider.rules.initial({ state: 'home' });
  })
  .name;
