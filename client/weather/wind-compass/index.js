import './index.scss';
import template from './template.pug';
import angular from 'angular';

export class WindCompassController {
  constructor($log) {
    'ngInject';
    this.$log = $log;
  }

  $onChanges(deltas) {
    if (deltas.wind) {
      const w = deltas.wind.currentValue;
      this.rotate = ((w && w.Direction.Degrees) || 0) + 180;
    }
  }
}

export default angular
  .module('app.windCompass', [])
  .component('windCompass', {
    template: template,
    controller: WindCompassController,
    bindings: {
      wind: '<',
    }
  })
  .name;
