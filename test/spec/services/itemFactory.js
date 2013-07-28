'use strict';

describe('Service: itemFactory', function () {

  // load the service's module
  beforeEach(module('svr2App'));

  // instantiate service
  var itemFactory,
      item = {};
  beforeEach(inject(function (_itemFactory_) {
    itemFactory = _itemFactory_;
    itemFactory.addItem(1);
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
      var items = itemFactory.getItems();
      
      expect(items).not.toBeNull();
    });
  });

  describe('getItem()', function() {
    it('gets an item', function () {
      itemFactory.addItem(1)
      expect(itemFactory.getItem(1).id).toEqual(1);
    });
  });

  describe('addItem()', function() {
    it('adds an item', function () {
      var items = itemFactory.getItems();
      
      expect(item.id).toEqual(1);
      expect(item.ranges).toEqual(jasmine.any(Array));
    });
  });

  describe('item.addRange', function(){
      it('add a range to the item and sort the array', function(){
        item.addRange(60, 70);

        expect(item.ranges[0]).toEqual({start: 0, stop: 10});
        expect(item.ranges[1]).toEqual({start: 20, stop: 30});
        expect(item.ranges[2]).toEqual({start: 60, stop: 70});      
        expect(item.ranges[3]).toEqual({start: 80, stop: 90});      
   
      });
  });

  describe('item.removeRange', function(){
      it('removes a range from the item', function(){
        item.removeRange(0);

        expect(item.ranges).not.toContain({start: 0, stop: 10});
        expect(item.ranges[0]).toEqual({start: 20, stop: 30});
        expect(item.ranges[1]).toEqual({start: 80, stop: 90});       
      });
  });

  describe('item.getRangeIndex', function(){
      it('get the index of a range based on its start position', function(){
        var id = item.getRangeIndex(20);
        expect(id).toEqual(1);       
      });
  });

  describe('item.updateRange', function(){
      it('updates an existing range', function(){
        var id = item.getRangeIndex(20);
        item.updateRange(id, 95, 100)

        expect(item.ranges[0]).toEqual({start: 0, stop: 10});
        expect(item.ranges[1]).toEqual({start: 80, stop: 90});      
        expect(item.ranges[2]).toEqual({start: 95, stop: 100});         
      });
  });

  describe('item.getRange', function(){
      it('get range based on its index', function(){
        var range = item.getRange(2);
        expect(range).toEqual({start: 80, stop: 90});       
      });
  });

  describe('item.hasRange', function(){
      it('returns true or false depending if any range of the item cover a position value', function(){
        var val1 = item.hasRange(7),
            val2 = item.hasRange(75);

        expect(val1).toBe(true)
        expect(val2).toBe(false)
               
      });
  });
});