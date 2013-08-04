'use strict';

describe('Service: errorFactory', function () {

  // load the service's module
  beforeEach(module('svr2App'));

  // instantiate service
  var errorFactory;
  beforeEach(inject(function (_errorFactory_) {
    errorFactory = _errorFactory_;
  }));

  it('should do something', function () {
    expect(!!errorFactory).toBe(true);
  });

});
