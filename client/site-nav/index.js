import angular from 'angular';
import weatherName from '../weather';
import template from './template.pug';

export class NavController {
  constructor(weather) {
    'ngInject';
    this.weather = weather;
  }

  get limits() {
    var w = this.weather;
    if (isNaN(w.limit) || isNaN(w.remaining)) {
      return '';
    }
    return w.remaining + ' / ' + w.limit;
  }
}

export default angular
  .module('app.navbar', [weatherName])
  .component('siteNav', {
    controller: NavController,
    template: template,
  })
  .name;
