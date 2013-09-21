'use strict';

angular.module('hjortronApp')
  .service('elementLibrary', function elementLibrary() {
    var factory = {},
        library = {
            'elements' : {}
        };

    // TODO write test
    factory.set = function(name, key, value){
        if(!library.elements[name]) library.elements[name] = {};
        library.elements[name][key] = value;
        return library;
    }

    // TODO write test
    factory.get = function(name){
        return library.elements[name];
    }
 
    return factory;

  });
