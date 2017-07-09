import angular from 'angular';
import home from './home';
import dash from './dash';
import './index.scss';

export default angular
  .module('app', [home, dash])
  .name;
