import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import siteNav from '../site-nav';
import template from './template.pug';

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
  constructor($log, $window) {
    'ngInject';
    this.$log = $log;
    this.geolocation = $window.navigator && $window.navigator.geolocation;
  }

  isInvalidZip(zip) {
    return !zip || !/^\d{5}$/.test(zip);
  }

  isInvalidGeo(lat, lng) {
    return (isNaN(lat = Number(lat)) || lat > 90 || lat < -90) ||
           (isNaN(lng = Number(lng)) || lng > 180 || lng < -180);
  }

  getGeo() {
    this.geolocation.getCurrentPosition(pos => {
      let coords = pos && pos.coords;
      if (coords) {
        this.lat = pos.coords.latitude.toFixed(2);
        this.lng = pos.coords.longitude.toFixed(2);
      }
    }, err => {
      this.$log.error('HomeController', 'getGeo', err);
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
