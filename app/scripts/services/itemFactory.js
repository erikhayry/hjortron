'use strict';

/**
Service for items

@class itemFactory 
**/
angular.module('svr2App')
  .service('itemFactory', function itemFactory(rangeService) {
    var factory = {};

	/**
	Returns item

	@method itemFactory.getItem
	@param {String} id of item
	@return {object} item of id
	**/
	factory.getItem = function(id){
	    return items[id];
	}

	/**
	Get all items

	@method itemFactory.getItems
	@return {object} items
	**/
	factory.getItems = function(){
	    return items;
	}

	/**
	Adds one item to items

	@method itemFactory.addItem
	@param {object} item object
	@return {object} items
	**/
	factory.addItem = function(id){
		var item = {
			id : id,
            ranges: rangeService.getRanges(),
            addRange: function(start, stop){
                rangeService.addRange(item.ranges, start, stop);
                return item;
            },
            removeRange: function(start){
                rangeService.removeRange(item.ranges, start);
                return item;
            },
            updateRange: function updateRange(oldStart, start, stop){
                rangeService.updateRange(item.ranges, oldStart, start, stop)
                return item;
            },
            getRangeIndex: function(start){
                return rangeService.getRangeIndex(item.ranges, start);
            },
            getRange: function getRange(start){
                return rangeService.getRange(item.ranges, start);
            },
            hasRange: function hasRange(currentPosition){
                return rangeService.hasRange(item.ranges, currentPosition);
            }
		}

		items[item.id] = item;

        return factory;
	}

	/**
	Removes items from items

	@method itemFactory.addItem
	@param {string} id of item
	**/
	factory.removeItem = function(id){
	
	}

	var items = {};

	return factory;
  });


