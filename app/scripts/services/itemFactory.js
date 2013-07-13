'use strict';
/**
Service for items

@class itemFactory 
**/
angular.module('svr2App')
  .service('itemFactory', function itemFactory() {
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
	factory.addItem = function(item){
		items[item.id] = item;
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
