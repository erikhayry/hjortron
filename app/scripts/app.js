'use strict';
/**
The main app

@class svr2App 
**/
angular.module('svr2App', [])

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
  Timebar directive

  @property timeBar
  @type directive
  **/
  .directive('timeBar', function(pageFactory){
    var linker = function($scope, iElement){
      // get left position of current handler el
      var findPos = function(el) {
          var posX = el.offsetLeft;
          while (el.offsetParent) {
            posX = posX + el.offsetParent.offsetLeft;
            if (el == document.getElementsByTagName('body')[0]) {
              break;
            } else {
              el = el.offsetParent;
            }
          }
          return posX;
      },

      setTimebar = function(timebar){
        pageFactory.setTimebar('width', timebar.offsetWidth);
        pageFactory.setTimebar('left', findPos(timebar));
      },

      timebar = iElement[0];
      setTimebar(timebar);

      window.onresize = function(){
        setTimebar(timebar);
      }
    }

    return {
      'link' : linker,
      'restrict' : 'E',
      'transclude' : true,
      'templateUrl' : '/directives/timeBar.html',
      'replace' : true
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
  /**
  videoHolder directive

  @property videoHolder
  @type directive
  **/
  .directive('videoHolder', function(videoFactory){
    var linker = function($scope, iElement){
      $scope.$watch('currentTimeBarTime', function(){
          var videoEl = iElement[0].getElementsByTagName('video')[0];          
          try{
            videoEl.currentTime = $scope.currentTimeBarTime;
           }
          catch(error){
            console.log(error)
          }

      })
    }

    return {
        'link' : linker,
        'restrict' : 'E',
        'transclude' : true,
        'templateUrl' : '/directives/videoHolder.html',
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
