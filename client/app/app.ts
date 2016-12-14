'use strict';

angular.module('siteCurApp', [
  'siteCurApp.auth',
  'siteCurApp.admin',
  'siteCurApp.constants',
  'siteCurApp.sensor',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ui.bootstrap.datetimepicker',
  'chart.js'
])
  .config(function($urlRouterProvider, $locationProvider, ChartJsProvider) {
    $urlRouterProvider
      .otherwise('/');

    ChartJsProvider.setOptions({ colours : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });

    $locationProvider.html5Mode(true);
  }).
  run(function ($rootScope, Auth) {
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      Auth.isLoggedIn(function (state) {
        $rootScope.userLoggedIn = state;
      });
    });
  });
