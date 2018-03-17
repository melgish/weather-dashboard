// eslint-disable-next-line import/no-unresolved
import template from './template.pug?svg';
import angular from 'angular';

/**
 * @class ThermometerController
 */
class ThermometerController {
  /**
   *
   * @param {*} $log angular logging service
   */
  constructor($log) {
    'ngInject';
    this.debug = $log.debug.bind($log, 'ThermometerController');
    this.Low = 50;
    this.High = 100;
    this.y = 25;
  }

  $onChanges(deltas) {
    if (deltas.temperature) {
      let t = deltas.temperature.currentValue;
      if (!isNaN(t)) {
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
}

const name = 'app.thermometer';
angular
  .module(name, [])
  .component('thermometer', {
    template: template,
    controller: ThermometerController,
    bindings: {
      temperature: '<',
    }
  })
  .name;

export {
  name as default,
  name,
  ThermometerController,
};
