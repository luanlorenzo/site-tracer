'use strict';

angular.module('siteCurApp')
  .directive('mainview', () => ({
    templateUrl: 'components/mainview/mainview.html',
    restrict: 'E',
    controller: 'MainviewController',
    controllerAs: 'mainview'
  }));
