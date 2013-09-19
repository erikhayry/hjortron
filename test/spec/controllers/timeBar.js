'use strict';

describe('Controller: TimeBarCtrl', function () {

  // load the controller's module
  beforeEach(module('hjortronApp'));

  var TimeBarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, itemFactory) {
    scope = $rootScope.$new();
    TimeBarCtrl = $controller('TimeBarCtrl', {
      $scope: scope
    });
  }));

  /*describe('init', function(){
    it('Initialize the controller', function(){
      console.log(scope.item)
      expect(scope.item.id).toEqual(1);      
      
      var ranges = scope.item.ranges;
      expect(ranges.length).toBe(4)

      expect(scope.needle.value).toEqual(0);
      expect(scope.currentTimeBarTimeVar).toEqual(0);
    });
  });*/

/*  describe('removeRange', function(){
    it('remove range of the item in the scope', function(){
      scope.removeRange(30);
      var ranges = scope.item.ranges;
      expect(ranges.length).toBe(3)
    })
  })*/


});
