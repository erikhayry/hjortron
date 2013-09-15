'use strict';

angular.module('hjortronApp')
  .service('appFactory', function appFactoryF() {
    var factory = {};

    // TODO write test
    factory.setResource = function(name, element){
        library.elements[name] = element
        return library;
    }

    // TODO write test
    factory.getResource = function(name){
        return library.elements[name];
    }

    factory.getMouse = function(){
    	return library.mouse;
    }

    factory.setMouse = function(name, value){
    	library.mouse[name] = value;
    }

    // TODO make generic
    factory.setTimebar = function(name, value){
        library.timebar[name] = value;
    }

    // TODO make generic
    factory.getTimebar = function(){
        return library.timebar;
    }

	var library = {};
    library.elements = {},
    library.mouse = {
                "mousePosition" : 0,
                "mouseUp" : true
            }    

    library.timebar = {
        'range' : { 'start' : 0, 'isEditable' : false}
    };

    return factory;
  });
