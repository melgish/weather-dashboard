import './index.scss';
import angular from 'angular';
import home from './home';
import dash from './dash';
import siteNav from './site-nav';

export default angular
  .module('app', [home, dash, siteNav])
  .name;
