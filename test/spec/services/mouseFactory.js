'use strict';

describe('Service: mouseFactory', function () {

  // load the service's module
  beforeEach(module('hjortronApp'));

  // instantiate service
  var mouseFactory;
  beforeEach(inject(function (_mouseFactory_) {
    mouseFactory = _mouseFactory_;
  }));

  it('should do something', function () {
    expect(!!mouseFactory).toBe(true);
  });

});
