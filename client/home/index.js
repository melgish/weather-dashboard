import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import template from './template.pug';

export function routeConfig($stateProvider, $urlServiceProvider) {
    'ngInject';
    $stateProvider.state('home', {
      url: '/',
      component: 'home',
    });
    $urlServiceProvider.rules.initial({ state: 'home' });
}

export default angular
  .module('app.home', [uiRouter])
  .component('home', {
    template: template,
  })
  .config(routeConfig)
  .name;
