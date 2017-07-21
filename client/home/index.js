import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import siteNav from '../site-nav';
import template from './template.pug';

/**
 * Configuration for home page view
 * @param {*} $stateProvider ui-router state services
 * @param {*} $urlServiceProvider ui-router url services
 */
export function routeConfig($stateProvider, $urlServiceProvider) {
    'ngInject';
    $stateProvider.state('home', {
      url: '/',
      views: {
        'nav': 'siteNav',
        '': 'home',
      }
    });
    $urlServiceProvider.rules.initial({ state: 'home' });
}

export class HomeController {
  /**
   * @param {*} $log angular logging service
   * @param {*} $window angular $window wrapper
   */
  constructor($log, $window) {
    'ngInject';
    this.$log = $log;
    this.geolocation = $window.navigator && $window.navigator.geolocation;
  }

  getGeo() {
    this.alert = null;
    this.geolocation.getCurrentPosition(pos => {
      let coords = pos && pos.coords;
      if (coords) {
        this.lat = Number(pos.coords.latitude.toFixed(2));
        this.lng = Number(pos.coords.longitude.toFixed(2));
      }
    }, err => {
      this.$log.error('HomeController', 'getGeo', err);
      this.alert = 'Unable to read position.';
    });
  }
}

export default angular
  .module('app.home', [uiRouter, siteNav])
  .component('home', {
    controller: HomeController,
    template: template,
  })
  .config(routeConfig)
  .name;
