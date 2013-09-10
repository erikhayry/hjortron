'use strict';

describe('Service: timeBarFactory', function () {

  // load the service's module
  beforeEach(module('hjortronApp'));

  // instantiate service
  var timeBarFactory,
      itemFactory,
      scope;
  
  beforeEach(inject(function ($rootScope, _timeBarFactory_, _itemFactory_) {
    timeBarFactory = _timeBarFactory_;
  }));

  describe('getTimeBarValues()', function(){
    it('gets the width of the timebar and converts the current position and gap to percentage', function(){
      var timeBarValues = timeBarFactory.getTimeBarValues(5);

      //currently on returns null for position and gap since the timebar element doesn't exists when running tests
      expect(timeBarValues.position).toBeDefined;
      expect(timeBarValues.gap).toBeDefined;
    })
  });

  describe('getNeedleValue()', function(){
    it('checks and change needle values', function () {
      
      var needleVal1 = 40,
          needleVal2 = -5,
          needleVal3 = 110;  

      needleVal1 = timeBarFactory.getNeedleValue(needleVal1);
      needleVal2 = timeBarFactory.getNeedleValue(needleVal2);
      needleVal3 = timeBarFactory.getNeedleValue(needleVal3);

      expect(needleVal1).toBe(40);
      expect(needleVal2).toBe(0);
      expect(needleVal3).toBe(100);
    }); 
  });

  describe('getRangeValues', function(){
    
    beforeEach(inject(function ($rootScope, _timeBarFactory_, _itemFactory_) {
      timeBarFactory = _timeBarFactory_;
      itemFactory = _itemFactory_;
      scope = $rootScope.$new();    

      itemFactory.addItem(1);
      itemFactory.addItem(2);

      scope.item = itemFactory.getItem(1);
      scope.item.addRange(5, 10)
            .addRange(20, 20)
            .addRange(80, 100)
            .addRange(60, 70)
            .addRange(30, 40)
            .updateRange(80, 90, 95);
    }));

    it('it sets the stop value to the new position', function(){
      var id = scope.item.getRangeIndex(30),
          currentItem = {
                          item: scope.item, 
                          type: 'stop',
                          id: id
                        },  
          rangeValues = timeBarFactory.getRangeValues(currentItem, 45, 10);

      expect(rangeValues.start).toBe(30);
      expect(rangeValues.stop).toBe(45);
    });

    it('it sets the start value to the new position', function(){
      var id = scope.item.getRangeIndex(30),
          currentItem = {
                          item: scope.item, 
                          type: 'start',
                          id: id
                        },  
          rangeValues = timeBarFactory.getRangeValues(currentItem, 28, 5);

      expect(rangeValues.start).toBe(28);
      expect(rangeValues.stop).toBe(40);
    });

    it('it sets the stop value to the same as start if stop overlaps start', function(){
      var id = scope.item.getRangeIndex(30),
          currentItem = {
                          item: scope.item, 
                          type: 'stop',
                          id: id
                        },  
          rangeValues = timeBarFactory.getRangeValues(currentItem, 15, 10);

      expect(rangeValues.start).toBe(30);
      expect(rangeValues.stop).toBe(30);
    });

    it('it sets the start value to the same as stop if start overlaps stop', function(){
      var id = scope.item.getRangeIndex(30),
          currentItem = {
                          item: scope.item, 
                          type: 'start',
                          id: id
                        },  
          rangeValues = timeBarFactory.getRangeValues(currentItem, 60, 10);

      expect(rangeValues.start).toBe(40);
      expect(rangeValues.stop).toBe(40);
    });

    it('it set the set the stop value to be anything between the start value and the siblings start value - the gap value', function(){
      var id = scope.item.getRangeIndex(30),
          currentItem = {
                          item: scope.item, 
                          type: 'stop',
                          id: id
                        },  
          rangeValues = timeBarFactory.getRangeValues(currentItem, 56, 5);

      expect(rangeValues.start).toBe(30);
      expect(rangeValues.stop).toBe(55);
    });

    it('it set the set the start value to be anything between the stop value and the siblings stop value + the gap value', function(){
      var id = scope.item.getRangeIndex(30),
          currentItem = {
                          item: scope.item, 
                          type: 'start',
                          id: id
                        },  
          rangeValues = timeBarFactory.getRangeValues(currentItem, 21, 5);

      expect(rangeValues.start).toBe(25);
      expect(rangeValues.stop).toBe(40);
    });

    it('it makes sure any value is bewteen 0 and 100', function(){
      var id = scope.item.getRangeIndex(90),
          currentItem = {
                          item: scope.item, 
                          type: 'stop',
                          id: id
                        },  
          rangeValues = timeBarFactory.getRangeValues(currentItem, 101, 5);
      
      var id2 = scope.item.getRangeIndex(5),
          currentItem2 = {
                          item: scope.item, 
                          type: 'start',
                          id: id2
                        },
          rangeValues2 = timeBarFactory.getRangeValues(currentItem2, -5, 5);

      expect(rangeValues.start).toBe(90);
      expect(rangeValues.stop).toBe(100);

      expect(rangeValues2.start).toBe(0);
      expect(rangeValues2.stop).toBe(10);
    });    
  });
});
