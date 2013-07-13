'use strict';

angular.module('svr2App')
  .service('pageFactory', function pageFactory() {
    var factory = {};

    factory.getMouse = function(){
    	return mouse;
    }

    factory.getElement = function(key){
    	return elements[key];
    }

    factory.setMouse = function(key, value){
    	mouse[key] = value;
    }

    factory.setElements = function(key, value){
    	elements[key] = value;
    }

	var mouse = {
				"mousePosition" : 0,
				"mouseUp" : true
			}

	var elements = {}



    return factory;
  });
