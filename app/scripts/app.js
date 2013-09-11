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
          .when('/setup',
              {
                  templateUrl: '/partials/setup.html'
              })
          .when('/setup/itemId/addPostion/:rangeStart',
            {
              templateUrl: '/partials/setup.html'
            })
          .otherwise({ redirectTo: '/setup' });
  })
  //resource library (http://www.benfarrell.com/2013/07/15/ideas-from-game-programming-a-resource-library-with-angularjs/)
  .directive('library', function (pageFactory) {
    return function (scope, element, attrs) {
        pageFactory.setResource([attrs.library], element[0]);
    }
  })

  /**
  Range directive

  @property range
  @type directive
  **/
  .directive('range', function(){
    return {
      'require': '^timeBar',
      'restrict' : 'E',
      'templateUrl' : '/directives/range.html',
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
