'use strict';

describe('Component: SensorExplorerComponent', function () {

  // load the controller's module
  beforeEach(module('siteCurApp'));

  var SensorExplorerComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    SensorExplorerComponent = $componentController('SensorExplorerComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
