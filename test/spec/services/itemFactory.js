'use strict';

describe('Service: itemFactory', function () {

  // load the service's module
  beforeEach(module('svr2App'));

  // instantiate service
  var itemFactory;
  beforeEach(inject(function (_itemFactory_) {
    itemFactory = _itemFactory_;
  }));

  describe('getItems()', function() {
    it('returns an object', function () {
      var items = itemFactory.getItems();
      expect(items).not.toBeNull();
    });
  });

  describe('addItem()', function() {
    it('adds an item', function () {
      var items = itemFactory.getItems(),
          item = {ranges: 'ranges', id: 1};

      itemFactory.addItem(item);
      expect(items[1]).toBe(item);
    });
  });

  describe('getItem()', function() {
    it('gets an item', function () {
      var item = {ranges: 'ranges', id: 1};
      itemFactory.addItem(item)
      expect(itemFactory.getItem(1)).toBe(item);
    });
  });

});