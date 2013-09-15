'use strict';

describe('Service: appFactory', function () {

  // load the service's module
  beforeEach(module('hjortronApp'));

  // instantiate service
  var appFactory;
  beforeEach(inject(function (_appFactory_) {
    appFactory = _appFactory_;
  }));

  describe('getMouse()', function() {
    it('returns an object', function () {
      var mouse = appFactory.getMouse();
      expect(mouse).not.toBeNull();
    });
  });

  describe('setMouse()', function() {
    it('sets the current mouse value', function () {
      appFactory.setMouse('mousePosition', 10);
      appFactory.setMouse('mouseUp', true);
      expect(appFactory.getMouse()).toEqual({'mousePosition': 10, 'mouseUp': true});

    });
  });
});
