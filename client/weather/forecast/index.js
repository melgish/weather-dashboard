import angular from 'angular';
import template from './template.pug';
import weatherIcon from '../weather-icon';

export class ForecastController {
  $onChanges(deltas) {
    if (deltas.forecast) {
      var f = deltas.forecast.currentValue;
      this.Date = f && f.Date;
      this.Day = f && f.Day;
      this.Night = f && f.Night;
      var t = f && f.Temperature;
      this.Low = t && t.Minimum.Value;
      this.High = t && t.Maximum.Value;
      this.Unit = t && t.Minimum.Unit;
    }
  }
}

export default angular
  .module('app.forecast', [weatherIcon])
  .component('forecast', {
    template: template,
    controller: ForecastController,
    bindings: {
      forecast: '<',
    }
  })
  .name;
