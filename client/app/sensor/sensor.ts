'use strict';

angular.module('siteCurApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sensor', {
        url: '/sensors',
        template: '<sensor></sensor>',
        authenticate: 'admin'
      })
      .state('sensor_new', {
        url: '/sensor_new',
        template: '<newsensor></newsensor>',
        authenticate: 'admin'
      })
      .state('sensor_edit', {
        url: '/sensor_edit/{id}',
        template: '<editsensor></editsensor>',
        authenticate: 'admin'
      })
      .state('sensor_remove', {
        url: '/sensor_remove/{id}',
        template: '<removesensor></removesensor>',
        authenticate: 'admin'
      })
      .state('sensor_calibra', {
        url: '/sensor_calibra',
        template: '<calibrasensor></calibrasensor>',
        authenticate: 'admin'
      });

  });
