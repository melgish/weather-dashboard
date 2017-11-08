import './index.scss';
import angular from 'angular';
import template from './template.pug';

export class AnalogClockController {
  constructor() {
    'ngInject';
  }

  updateHands(time) {
    this.second = time.getSeconds() * 6;
    this.minute = time.getMinutes() * 6 + this.second / 60;
    this.hour = time.getHours() * 30 + this.minute / 12;
  }

  $onChanges(deltas) {
    if (deltas.time) {
      this.updateHands(deltas.time.currentValue);
    }
  }
}

export default angular
  .module('app.analog-clock', [])
  .component('analogClock', {
    template: template,
    controller: AnalogClockController,
    bindings: {
      time: '<',
    },
  })
  .name;
