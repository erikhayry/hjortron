'use strict';

angular.module('svr2App')
  .service('pageFactory', function pageFactory() {
    var factory = {};

    factory.getMouse = function(){
    	return mouse;
    }

    factory.setMouse = function(key, value){
    	mouse[key] = value;
    }

    //do I need service for this?
    factory.getElement = function(key){
        return elements[key];
    }

    factory.setElements = function(key, value){
    	elements[key] = value;
        console.log(elements)
    }

	var mouse = {
				"mousePosition" : 0,
				"mouseUp" : true
			}

	var elements = {}


    return factory;
  });
