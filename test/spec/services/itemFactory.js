'use strict';

describe('Service: itemFactory', function () {

  // load the service's module
  beforeEach(module('svr2App'));

  // instantiate service
  var itemFactory,
      item = {};
  beforeEach(inject(function (_itemFactory_) {
    itemFactory = _itemFactory_;
    itemFactory.addItem(1).addItem(2);

    item = itemFactory.getItem(1);
    item.addRange(20, 30)
          .addRange(0, 10)
          .addRange(80, 90);
  }));

  afterEach(function() {
    item = {};
  });

  describe('getItems()', function() {
    it('returns an object', function () {
      var items = itemFactory.getItems(),
          item = items[1],
          ranges = items[1].ranges;
      
      expect(item.id).toEqual(1);
      expect(ranges.length).toEqual(3);
      expect(item.addRange).toEqual(jasmine.any(Function));
      expect(item.removeRange).toEqual(jasmine.any(Function));
      expect(item.updateRange).toEqual(jasmine.any(Function));
      expect(item.getRangeIndex).toEqual(jasmine.any(Function));
      expect(item.getRange).toEqual(jasmine.any(Function));
      expect(item.hasRange).toEqual(jasmine.any(Function));

    });
  });

  describe('getItem()', function() {
    it('gets an item', function () {
      expect(itemFactory.getItem(1).id).toEqual(1);
      expect(itemFactory.getItem(3)).not.toBeDefined();
    });
  });

  describe('addItem()', function() {
    it('adds an item', function () {
      var items = itemFactory.getItems();
      
      itemFactory.addItem(3);
      

      expect(function(){
        itemFactory.addItem(1);
      }).toThrow(new Error("Item already exist. Can't add item")); //Not sure if throwing an error here is the best option

      expect(items[3].id).toEqual(3);
      expect(items[1].ranges.length).toEqual(3);
    });
  });

  describe('item.addRange', function(){
      it('add a range to the item and sort the array', function(){
        
        item.addRange(60, 70);

        item.addRange(95, 95);

        //Add unvalid ranges
        item.addRange(0, 10); //add already existing range  
        item.addRange(15, 25); //adding range that overlap an existing one
        item.addRange(-10, -30); //add negative values
        item.addRange(120, 130); //add values larger than 100
        item.addRange(15, 11); //add value where stop is larger than start

        /*
        Move to range service testing

        //add already existing range  
        expect(function(){
          item.addRange(0, 10);
        }).toThrow(new Error("Range values not valid"));

        //adding range that overlap an existing one
        expect(function(){
          item.addRange(15, 25);
        }).toThrow(new Error("Range values not valid")); //Not sure if throwing an error here is the best option

        //add negative values
        expect(function(){
          item.addRange(-10, -30);
        }).toThrow(new Error("Range values not valid")); //Not sure if throwing an error here is the best option

        //add values larger than 100
        expect(function(){
          item.addRange(120, 130);
        }).toThrow(new Error("Range values not valid")); //Not sure if throwing an error here is the best option

        //add value where stop is larger than start
        expect(function(){
          item.addRange(15, 11);
        }).toThrow(new Error("Range values not valid")); //Not sure if throwing an error here is the best option*/

        expect(item.ranges[0]).toEqual({start: 0, stop: 10});
        expect(item.ranges[1]).toEqual({start: 20, stop: 30});
        expect(item.ranges[2]).toEqual({start: 60, stop: 70});      
        expect(item.ranges[3]).toEqual({start: 80, stop: 90});      
        expect(item.ranges[4]).toEqual({start: 95, stop: 95});      
   
      });
  });

  describe('item.removeRange', function(){
      it('removes a range from the item', function(){
        
        item.removeRange(20);

        //try to remove range that doesn't exist
        item.removeRange(4);

        expect(item.ranges).not.toContain({start: 20, stop: 30});
        expect(item.ranges[0]).toEqual({start: 0, stop: 10});
        expect(item.ranges[1]).toEqual({start: 80, stop: 90});       
      });
  });

  describe('item.getRangeIndex', function(){
      it('get the index of a range based on its start position', function(){
        var id1 = item.getRangeIndex(20),
            id2 = item.getRangeIndex(40);

        expect(id1).toEqual(1);       
        expect(id2).toBeNull();     
      });
  });

  describe('item.updateRange', function(){
      it('updates an existing range', function(){

        item.updateRange(20, 95, 100);
        
        
        //Add unvalid ranges
        item.updateRange(70, 20, 30) //update a not existing range
        item.updateRange(80, 0, 10); //updating range to be the same as existing one
        item.updateRange(20, 5, 10); //updating range to overlap an existing one
        item.updateRange(20, -10, -30); //update to negative values
        item.updateRange(20, 120, 130); //update to values larger than 100
        item.updateRange(20, 15, 11); //update to values where stop is larger than start

        expect(item.ranges[0]).toEqual({start: 0, stop: 10});
        expect(item.ranges[1]).toEqual({start: 80, stop: 90});      
        expect(item.ranges[2]).toEqual({start: 95, stop: 100});         
      });
  });

  describe('item.getRange', function(){
      it('get range based on its index', function(){
        var range1 = item.getRange(2),
            range2 = item.getRange(3);

        expect(range1).toEqual({start: 80, stop: 90});       
        expect(range2).toBeUndefined();  
      });
  });

  describe('item.hasRange', function(){
      it('returns true or false depending if any range of the item cover a position value', function(){
        var val1 = item.hasRange(7),
            val2 = item.hasRange(0),
            val3 = item.hasRange(90),
            val4 = item.hasRange(75);

        expect(val1).toBe(true);
        expect(val2).toBe(true);
        expect(val3).toBe(true);
        expect(val4).toBe(false);
               
      });
  });
});