'use strict';

angular.module('siteCurApp')
  .directive('sidemenu', () => ({
    templateUrl: 'components/sidemenu/sidemenu.html',
    restrict: 'E',
    controller: 'SidemenuController',
    controllerAs: 'sidemenu'
  }));
