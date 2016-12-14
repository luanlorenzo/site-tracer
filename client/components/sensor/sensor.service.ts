'use strict';

(function() {

function SensorResource($resource) {
  return $resource('/api/sensors/:id', {
    id: '@_id'
  }, {
    get: {
      method: 'GET'
    }
  });
}

angular.module('siteCurApp.sensor')
  .factory('SensorService', SensorResource);

})();
