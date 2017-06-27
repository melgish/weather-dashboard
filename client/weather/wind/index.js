import angular from 'angular';
import template from './template.pug';
import windCompass from '../wind-compass';
import './index.scss';

class WindController {
  $onChanges(deltas) {
    if (deltas.wind) {
      const w = deltas.wind.currentValue;
      this.Direction = w && w.Direction.Localized;
      this.Speed = w && w.Speed.Imperial.Value;
      this.SUnit = w && w.Speed.Imperial.Unit;
    }
    if (deltas.gusts) {
      const g = deltas.gusts.currentValue;
      this.Gusts = g && g.Speed.Imperial.Value;
      this.GUnit = g && g.Speed.Imperial.Unit;
    }
  }
}

export default angular
  .module('app.wind', [windCompass])
  .component('wind', {
    template: template,
    controller: WindController,
    bindings: {
      wind: '<',
      gusts: '<',
    }
  })
  .name;
