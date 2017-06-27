import angular from 'angular';
import template from './template.pug';

class LocationController {
  $onChanges(deltas) {
    if (deltas.location) {
      const l = deltas.location.currentValue;
      this.City = l && l.LocalizedName;
      this.State = l && l.AdministrativeArea.LocalizedName;
      this.Country = l && l.Country.LocalizedName;
      this.Region = l && l.Region.LocalizedName;
    }
  }
}

export default angular
  .module('app.location', [])
  .component('location', {
    template: template,
    controller: LocationController,
    bindings: {
      location: '<',
    }
  })
  .name;
