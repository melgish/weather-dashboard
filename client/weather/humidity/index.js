import angular from 'angular';
import template from './template.pug';

class HumidityController {
  $onChanges(deltas) {
    if (deltas.humidity) {
      const p = deltas.humidity.currentValue;
      this.Humidity = p && p;
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
