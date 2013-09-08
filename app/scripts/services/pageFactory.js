'use strict';

angular.module('hjortronApp')
  .service('pageFactory', function pageFactory() {
    var factory = {};

    factory.setResource = function(name, element){
        library.elements[name] = element
        return library;
    }

    factory.getResource = function(name){
        return library.elements[name];
    }

    factory.getMouse = function(){
    	return library.mouse;
    }

    factory.setMouse = function(name, value){
    	library.mouse[name] = value;
    }

    factory.setTimebar= function(name, value){
        library.timebar[name] = value;
    }

    factory.getTimebar= function(){
        return library.timebar;
    }

	var library = {};
    library.elements = {},
    library.mouse = {
                "mousePosition" : 0,
                "mouseUp" : true
            }    

    library.timebar = {}        

    return factory;
  });
