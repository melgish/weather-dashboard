import angular from 'angular';
import weatherName from '../weather';
import template from './template.pug';

class StatsController {
  constructor(weather) {
    'ngInject';
    this.weather = weather;
  }

  $onInit() {
    this.weather.getStats().then(stats => {
      if (!(isNaN(stats.limit) || isNaN(stats.remaining))) {
        this.limit = stats.limit;
        this.remaining = stats.remaining;
      }
    });
  }
}

const name = 'app.stats';

angular
  .module('app.stats', [weatherName])
  .component('stats', {
    controller: StatsController,
    template: template,
  });

  export {
    name as default,
    name,
    StatsController,
  };
