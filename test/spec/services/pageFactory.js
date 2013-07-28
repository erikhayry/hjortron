'use strict';

describe('Service: pageFactory', function () {

  // load the service's module
  beforeEach(module('svr2App'));

  // instantiate service
  var pageFactory;
  beforeEach(inject(function (_pageFactory_) {
    pageFactory = _pageFactory_;
  }));

  describe('getMouse()', function() {
    it('returns an object', function () {
      var mouse = pageFactory.getMouse();
      expect(mouse).not.toBeNull();
    });
  });

  describe('setMouse()', function() {
    it('sets the current mouse value', function () {
      pageFactory.setMouse('mousePosition', 10);
      pageFactory.setMouse('mouseUp', true);
      expect(pageFactory.getMouse()).toEqual({'mousePosition': 10, 'mouseUp': true});

    });
  });
});
