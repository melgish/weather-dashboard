import angular from 'angular';
import template from './template.pug';

export class HumidityController {
  $onChanges(deltas) {
    if (deltas.humidity) {
      const p = deltas.humidity.currentValue;
      this.Humidity = p;
      this.Unit = '%';
    }
  }
}

export default angular
  .module('app.humidity', [])
  .component('humidity', {
    template: template,
    controller: HumidityController,
    bindings: {
      humidity: '<',
    }
  })
  .name;
