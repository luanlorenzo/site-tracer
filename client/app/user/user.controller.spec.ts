'use strict';

describe('Component: UserComponent', function () {

  // load the controller's module
  beforeEach(module('siteCurApp'));

  var UserComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    UserComponent = $componentController('UserComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
