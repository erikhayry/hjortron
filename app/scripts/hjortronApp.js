'use strict';
/**
The main app

@class hjortronApp 
**/
angular.module('hjortronApp', ['timeBarDirective', 'videoHolderDirective'])

  .config(function ($routeProvider) {
      /**
      Sets upp the routing for the app

      @property $routeProvider
      @type angualr function
      **/
      $routeProvider
          .when('/setup/item/:itemId',
            {
                templateUrl: '/partials/itemSetup.html'
            })
          .when('/setup/item/:itemId/range/:rangeStart',
            {
              templateUrl: '/partials/rangeSetup.html'
            })
          .otherwise({ redirectTo: '/setup/item/1' });
  })

  //resource library (http://www.benfarrell.com/2013/07/15/ideas-from-game-programming-a-resource-library-with-angularjs/)
  .directive('library', function (elementLibrary) {
    return function (scope, element, attrs) {
        elementLibrary.set(attrs.library, 'el', element[0]);
    }
  })

  /**
  Range draggable directive

  @property range
  @type directive
  **/
  .directive('rangeDraggable', function(){
    return {
      'require': '^timeBar',
      'restrict' : 'E',
      'templateUrl' : '/directives/rangeDraggable.html',
      'replace' : true
    }
  })

  /**
  Range editable directive

  @property range
  @type directive
  **/
  .directive('rangeEditable', function(){
    return {
      'require': '^timeBar',
      'restrict' : 'E',
      'templateUrl' : '/directives/rangeEditable.html',
      'replace' : true
    }
  })

  /**
  Needle directive

  @property needle
  @type directive
  **/
  .directive('needle', function(){
    return {
      'require': '^timeBar',
      'restrict' : 'E',
      'templateUrl' : '/directives/needle.html',
      'replace' : true
    }
  })

  /*
    Filters
  */

  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  });
