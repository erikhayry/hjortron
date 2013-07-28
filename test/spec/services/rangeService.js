'use strict';

describe('Service: rangeService', function () {

  // load the service's module
  beforeEach(module('svr2App'));

  // instantiate service
  var rangeService;
  beforeEach(inject(function (_rangeService_) {
    rangeService = _rangeService_;
  }));

  it('should do something', function () {
    expect(!!rangeService).toBe(true);
  });

});
