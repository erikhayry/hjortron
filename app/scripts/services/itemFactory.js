'use strict';

/**
Service for items

@class itemFactory 
**/
angular.module('svr2App')
  .service('itemFactory', function itemFactory(rangeService, errorFactory) {
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
        if(!factory.getItem(id)){
    		var item = {
    			id : id,
                ranges: [],
                addRange: function(start, stop){
                	try {
                		rangeService.addRange(item.ranges, start, stop);
                	}
                	catch(error){
                		errorFactory.addError('RangeError', {
                			'message' : 'Range (' + start + ', ' + stop + ') not valid, not added',
                			'where' : 'itemFactory > addRange'
                		});
                	}
                    return item;	
                },
                removeRange: function(start){
                	try{
                		rangeService.removeRange(item.ranges, start);
                	}
                	catch(error){
                		errorFactory.addError('RangeError', {
                			'message' : 'Range (' + start +') not fund. Unable to remove',
                			'where' : 'itemFactory > removeRange'
                		})
                	}
                    return item;
                },
                updateRange: function updateRange(oldStart, start, stop){
                	try{
                		rangeService.updateRange(item.ranges, oldStart, start, stop)
                	}
                	catch(error){
                		errorFactory.addError('RangeError', {
                			'message' : 'Range not found (' + oldStart + ') or not valid (' + start + ', ' + stop + '). Unable to update',
                			'where' : 'itemFactory > updateRange'
                		})
                	}
                    return item;
                },
                getRangeIndex: function(start){
                    return rangeService.getRangeIndex(item.ranges, start);
                },
                getRange: function getRange(start){
                    return rangeService.getRange(item.ranges, start);
                },
                hasRange: function hasRange(currentPosition, exclude){
                    return rangeService.hasRange(item.ranges, currentPosition, exclude);
                }
    		}; 

    		items[item.id] = item;
        }
        else{
            throw {name : "ItemError", message : "Item already exist. Can't add item"}; 
        }    
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


