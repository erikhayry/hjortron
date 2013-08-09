'use strict';

describe('Service: rangeService', function () {

  // load the service's module
  beforeEach(module('svr2App'));

  // instantiate service
  var rangeService,
      ranges = [];

  beforeEach(inject(function (_rangeService_) {
    rangeService = _rangeService_;
    ranges = [];
    rangeService.addRange(ranges, 20, 30);
    rangeService.addRange(ranges, 0, 10);
    rangeService.addRange(ranges, 80, 90);
  }));


  describe('getRange()', function(){
    it('returns range from range array', function () {
      expect(rangeService.getRange(ranges, 0)).toEqual({ start: 0, stop: 10 });
      expect(rangeService.getRange(ranges, 3)).toBeUndefined();
    });
  });

  describe('addRange()', function(){
      it('add a range to the to ranges and sort the array', function(){
        
        rangeService.addRange(ranges, 60, 70);
        rangeService.addRange(ranges, 95, 95);

        //add already existing range  
        expect(function(){
          rangeService.addRange(ranges, 0, 10);
        }).toThrow(new Error("Range values not valid"));

        //adding range that overlap an existing one
        expect(function(){
          rangeService.addRange(ranges, 15, 25);
        }).toThrow(new Error("Range values not valid")); //Not sure if throwing an error here is the best option

        //add negative values
        expect(function(){
          rangeService.addRange(ranges, -10, -30);
        }).toThrow(new Error("Range values not valid")); //Not sure if throwing an error here is the best option

        //add values larger than 100
        expect(function(){
          rangeService.addRange(ranges, 120, 130);
        }).toThrow(new Error("Range values not valid")); //Not sure if throwing an error here is the best option

        //add value where stop is larger than start
        expect(function(){
          rangeService.addRange(ranges, 15, 11);
        }).toThrow(new Error("Range values not valid")); //Not sure if throwing an error here is the best option   
        
        expect(ranges[0]).toEqual({start: 0, stop: 10});
        expect(ranges[1]).toEqual({start: 20, stop: 30});
        expect(ranges[2]).toEqual({start: 60, stop: 70});      
        expect(ranges[3]).toEqual({start: 80, stop: 90});      
        expect(ranges[4]).toEqual({start: 95, stop: 95});   
      });
  });

  describe('removeRange()', function(){
      it('removes a range from ranges', function(){
        
        rangeService.removeRange(ranges, 20);

        //try to remove range that doesn't exist
        expect(function(){
          rangeService.removeRange(ranges, 4);
        }).toThrow(new Error("Range value not found")); //Not sure if throwing an error here is the best option   

        expect(ranges).not.toContain({start: 20, stop: 30});
        expect(ranges[0]).toEqual({start: 0, stop: 10});
        expect(ranges[1]).toEqual({start: 80, stop: 90});       
      });
  });

  describe('getRangeIndex()', function(){
      it('get the index of a range based on its start position', function(){
        var id1 = rangeService.getRangeIndex(ranges, 20),
            id2 = rangeService.getRangeIndex(ranges, 40);

        expect(id1).toEqual(1);       
        expect(id2).toBeNull();     
      });
  });

  describe('updateRange', function(){
      it('updates an existing range', function(){

        rangeService.updateRange(ranges, 20, 95, 100); //update to completely new non existing value
        rangeService.updateRange(ranges, 80, 85, 90);  //update only the start value and to an old value of the same range
        rangeService.updateRange(ranges, 95, 95, 99);  //update only the stop value and to an old value of the same range
        
        
        //Add unvalid ranges
        expect(function(){
          rangeService.updateRange(ranges, 70, 20, 30) //update a not existing range
        }).toThrow(new Error("Range not found or not valid"));
        
        expect(function(){
          rangeService.updateRange(ranges, 95, 0, 10); //updating range to be the same as another existing one
        }).toThrow(new Error("Range not found or not valid"));
        
        expect(function(){
          rangeService.updateRange(ranges, 20, 5, 10); //updating range to overlap an existing one
        }).toThrow(new Error("Range not found or not valid"));
        
        expect(function(){
          rangeService.updateRange(ranges, 20, -10, -30); //update to negative values
        }).toThrow(new Error("Range not found or not valid"));
        
        expect(function(){
          rangeService.updateRange(ranges, 20, 120, 130); //update to values larger than 100
        }).toThrow(new Error("Range not found or not valid"));
        
        expect(function(){
          rangeService.updateRange(ranges, 20, 15, 11); //update to values where stop is larger than start
        }).toThrow(new Error("Range not found or not valid"));

        expect(ranges[0]).toEqual({start: 0, stop: 10});
        expect(ranges[1]).toEqual({start: 85, stop: 90});      
        expect(ranges[2]).toEqual({start: 95, stop: 99});         
      });
  });

  describe('hasRange()', function(){
      it('returns true or false depending if any range cover a position value', function(){
        var val1 = rangeService.hasRange(ranges, 7),
            val2 = rangeService.hasRange(ranges, 0),
            val3 = rangeService.hasRange(ranges, 90),
            val4 = rangeService.hasRange(ranges, 75);

        expect(val1).toBe(true);
        expect(val2).toBe(true);
        expect(val3).toBe(true);
        expect(val4).toBe(false);
               
      });
  });

});
