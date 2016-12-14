'use strict';

describe('Component: SensorComponent', function () {

  // load the controller's module
  beforeEach(module('siteCurApp'));

  var SensorComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    SensorComponent = $componentController('SensorComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
