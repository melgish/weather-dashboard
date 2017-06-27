import angular from 'angular';
import template from './template.pug';
import weatherApi from '../api';

class IconController {
  constructor($log, weather) {
    'ngInject';
    this.getIconURL = weather.getIconURL;
  }

  $onChanges(deltas) {
    if (deltas.day) {
      const day = deltas.day.currentValue;
      this.iconURL = this.getIconURL(day && day.Icon);
      this.altText = day && day.IconPhrase;
    }
  }
}

export default angular
  .module('app.weather.icon', [weatherApi])
  .component('weatherIcon', {
    template: template,
    controller: IconController,
    bindings: {
      day: '<',
    }
  })
  .name;
