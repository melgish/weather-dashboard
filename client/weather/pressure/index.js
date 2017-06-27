import angular from 'angular';
import template from './template.pug';

class PressureController {
  $onChanges(deltas) {
    if (deltas.pressure) {
      const p = deltas.pressure.currentValue;
      this.Pressure = p && p.Imperial.Value;
      this.Unit = p && p.Imperial.Unit;
    }
  }
}

export default angular
  .module('app.pressure', [])
  .component('pressure', {
    template: template,
    controller: PressureController,
    bindings: {
      pressure: '<',
    }
  })
  .name;
