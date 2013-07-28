'use strict';

describe('Controller: TimeBarCtrl', function () {

  // load the controller's module
  beforeEach(module('svr2App'));

  var TimeBarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TimeBarCtrl = $controller('TimeBarCtrl', {
      $scope: scope
    });
  }));


});
