'use strict';

describe('Service: timeBarService', function () {

  // load the service's module
  beforeEach(module('svr2App'));

  // instantiate service
  var timeBarService;
  beforeEach(inject(function (_timeBarService_) {
    timeBarService = _timeBarService_;
  }));

  it('should do something', function () {
    expect(!!timeBarService).toBe(true);
  });

});
