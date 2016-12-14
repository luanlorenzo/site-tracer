'use strict';

angular.module('siteCurApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sensor_explorer', {
        url: '/sensor_explorer',
        template: '<sensor-explorer></sensor-explorer>'
      })
      .state('sensor_explorer_read', {
        url: '/sensor_explorer_read/{id}',
        template: '<sensor-explorer-read></sensor-explorer-read>'
      })
  });
