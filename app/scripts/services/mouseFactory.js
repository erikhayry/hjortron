'use strict';

angular.module('hjortronApp')
  .service('mouseFactory', function mouseFactory() {
   	var factory = {},
        mouse = {};

    factory.getMouse = function(){
    	return mouse;
    }

    factory.setMouse = function(name, value){
      mouse[name] = value;
    }

    return factory;

  });
