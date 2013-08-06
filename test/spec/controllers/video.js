'use strict';

describe('VideoCtrl', function () {

  // load the controller's module
  beforeEach(module('svr2App'));

  var VideoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VideoCtrl = $controller('VideoCtrl', {
      $scope: scope
    });
  }));
});
