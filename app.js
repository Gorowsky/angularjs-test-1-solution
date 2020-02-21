import angular from 'angular';
import ngRoute from 'angular-route';
import './styles.css';
import './src/index';

const requires = [
  ngRoute,
  'home'
];

window.app = angular.module('app', requires);

angular.bootstrap(document.getElementById('app'), ['app']);