import './index.scss';
import angular from 'angular';
import api from './api';
import wind from './wind';
import temperature from './temperature';
import location from './location';
import pressure from './pressure';
import humidity from './humidity';
import clock from './clock';
import forecast from './forecast';

export default angular
  .module('app.weather', [
    api,
    temperature,
    wind,
    location,
    pressure,
    humidity,
    clock,
    forecast
  ])
  .name;
