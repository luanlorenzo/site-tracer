'use strict';

angular.module('siteCurApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('atuadores', {
        url: '/atuadores',
        template: '<atuadores></atuadores>',
        authenticate: true
      });
  });
