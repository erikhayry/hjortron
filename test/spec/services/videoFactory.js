'use strict';

describe('Service: videoFactory', function () {

  // load the service's module
  beforeEach(module('svr2App'));

  // instantiate service
  var videoFactory;
  beforeEach(inject(function (_videoFactory_) {
    videoFactory = _videoFactory_;
  }));

  it('should do something', function () {
    expect(!!videoFactory).toBe(true);
  });

});
