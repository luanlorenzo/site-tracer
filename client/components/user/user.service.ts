'use strict';

(function() {

function UserResource($resource) {
  return $resource('/api/users/:id', {
    id: '@_id'
  }, {
    get: {
      method: 'GET'
    }
  });
}

angular.module('siteCurApp.auth')
  .factory('UserService', UserResource);

})();
