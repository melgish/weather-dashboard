import './index.scss';
import angular from 'angular';
import template from './template.pug';
import thermometer from '../thermometer';

export class TemperatureController {
  $onChanges(deltas) {
    if (deltas.temperature) {
      const t = deltas.temperature.currentValue;
      this.Temp = t && t.Imperial.Value;
      this.Unit = t && t.Imperial.Unit;
    }
  }
}

export default angular
  .module('app.temperature', [thermometer])
  .component('temperature', {
    template: template,
    controller: TemperatureController,
    bindings: {
      temperature: '<',
    }
  })
  .name;
