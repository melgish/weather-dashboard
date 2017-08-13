import './index.scss';
import template from './template.pug';
import angular from 'angular';

export class ThermometerController {
  constructor($log) {
    'ngInject';
    this.debug = $log.debug.bind($log, 'ThermometerController');
    this.Low = 60;
    this.High = 80;
    this.y = 20;
  }

  $onChanges(deltas) {
    if (deltas.temperature) {
      let t = deltas.temperature.currentValue;
      let b = Math.floor(t / 10)
      let f = b * 10;
      if (b % 2) {
        this.Low = f - 10;
        this.High = f + 10;
      } else {
        this.Low = f;
        this.High = f + 20;
      }
      this.y = 15 + ((this.High - t) / 20) * 50;
    }
  }
}

export default angular
  .module('app.thermometer', [])
  .component('thermometer', {
    template: template,
    controller: ThermometerController,
    bindings: {
      temperature: '<',
    }
  })
  .name;
