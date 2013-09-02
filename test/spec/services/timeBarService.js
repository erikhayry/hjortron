'use strict';

describe('Service: timeBarService', function () {

  // load the service's module
  beforeEach(module('svr2App'));

  // instantiate service
  var timeBarService;
  beforeEach(inject(function (_timeBarService_) {
    timeBarService = _timeBarService_;
  }));

  it('checks and change needle values', function () {
    
    var needleVal1 = 40,
        needleVal2 = -5,
        needleVal3 = 110;  

    needleVal1 = timeBarService.getNeedleValue(needleVal1);
    needleVal2 = timeBarService.getNeedleValue(needleVal2);
    needleVal3 = timeBarService.getNeedleValue(needleVal3);

    expect(needleVal1).toBe(40);
    expect(needleVal2).toBe(0);
    expect(needleVal3).toBe(100);
  });

});
