import angular from 'angular';
import template from './template.pug';
import weatherIcon from '../weather-icon';

class ForecastController {
  $onChanges(deltas) {
    if (deltas.forecast) {
      var f = deltas.forecast.currentValue;
      this.Date = f && f.Date;
      this.Day = f && f.Day;
      this.Night = f && f.Night;
      this.Low = f.Temperature.Minimum.Value;
      this.High = f.Temperature.Maximum.Value;
      this.Unit = f.Temperature.Minimum.Unit;
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
