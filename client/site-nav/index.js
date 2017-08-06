import angular from 'angular';
import statsName from '../stats';
import template from './template.pug';

export default angular
  .module('app.navbar', [statsName])
  .component('siteNav', {
    template: template,
  })
  .name;
