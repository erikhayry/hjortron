'use strict';

angular.module('svr2App')
  .service('errorFactory', function errorFactory() {

  	var factory = {},
  		errors = {};

  	factory.addError = function(type, value) {
  		(errors[type]) ? errors[type].push(value) : errors[type] = [value];
  		return factory;
  	}

  	factory.getErrors = function(){
  		return errors;
  	}

  	return factory;

  });
