'use strict';

angular.module('siteCurApp.user', [
  'siteCurApp.constants',
  'siteCurApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
