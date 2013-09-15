'use strict';

describe('Controller: RangeSetupCtrl', function () {

  // load the controller's module
  beforeEach(module('hjortronApp'));

  var RangeSetupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RangeSetupCtrl = $controller('RangeSetupCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
