'use strict';

angular.module('hjortronApp')
  .service('errorFactory', function errorFactory() {

  	var factory = {},
  		errors = {};

    // TODO write test
  	factory.addError = function(type, value) {
  		(errors[type]) ? errors[type].push(value) : errors[type] = [value];
  		return factory;
  	}

    // TODO write test
  	factory.getErrors = function(){
  		return errors;
  	}

  	return factory;

  });
