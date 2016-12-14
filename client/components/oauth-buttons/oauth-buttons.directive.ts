'use strict';

angular.module('siteCurApp')
  .directive('oauthButtons', function() {
    return {
      templateUrl: 'components/oauth-buttons/oauth-buttons.html',
      restrict: 'EA',
      controller: 'OauthButtonsCtrl',
      controllerAs: 'OauthButtons',
      scope: {
        classes: '@'
      }
    };
  });
