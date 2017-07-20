import angular from 'angular';
import home from './home';
import dash from './dash';
import siteNav from './site-nav';
import './index.scss';

export default angular
  .module('app', [home, dash, siteNav])
  .name;
