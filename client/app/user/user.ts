'use strict';

angular.module('siteCurApp')
  .config(function ($stateProvider) {

    $stateProvider
    .state('user', {
      url: '/user',
      template: '<user></user>',
      authenticate: 'admin'
    })
    .state('user_new', {
      url: '/user_new',
      template: '<newuser></newuser>',
      authenticate: 'admin'
    })
    .state('user_edit', {
      url: '/user_edit/{id}',
      template: '<edituser></edituser>',
      authenticate: 'admin'
    })

  });
