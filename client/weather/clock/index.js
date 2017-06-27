import angular from 'angular';
import template from './template.pug';

class ClockController {
  constructor($interval) {
    'ngInject';
    this.$interval = $interval;
  }
  $postLink() {
    this.ticker = this.$interval(() => {
      this.now = new Date();
    });
  }
  $onDestroy() {
    this.ticker();
  }
}
export default angular
  .module('app.clock', [])
  .component('clock', {
    template: template,
    controller: ClockController,
  })
  .name;
