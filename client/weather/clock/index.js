import angular from 'angular';
import template from './template.pug';

export class ClockController {
  constructor($interval) {
    'ngInject';
    this.$interval = $interval;
    this._update();
  }

  _update() {
    this.now = new Date();
  }

  $postLink() {
    this.ticker = this.$interval(this._update.bind(this), 1000);
  }

  $onDestroy() {
    this.ticker && this.$interval.cancel(this.ticker);
  }
}

export default angular
  .module('app.clock', [])
  .component('clock', {
    template: template,
    controller: ClockController,
  })
  .name;
