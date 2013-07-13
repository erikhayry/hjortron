'use strict';

angular.module('svr2App', [])
  .config(function ($routeProvider) {
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

  .directive('timeBar', function(pageFactory){
  var linker = function (scope, element) {
      function findPos(el) {
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
      }

      function updateTimeBar(){
        pageFactory.setElements('timeBar', {
                        'left' : findPos(element[0]),
                        'width' : element[0].offsetWidth
                        }
                  )
      }

      updateTimeBar();
      //TODO sort out how to fix size changes
      //setInterval(updateTimeBar, 1000);
    };
    return {
      'restrict' : 'E',
      'transclude' : true,
      'templateUrl' : '/directives/timeBar.html',
      'replace' : true,
      'link' : linker 
    }
  })
  .directive('range', function(){
    return {
      'require': '^timeBar',
        'restrict' : 'E',
        'templateUrl' : '/directives/range.html',
        'replace' : true
    }
  })
  .directive('needle', function(){
    return {
      'require': '^timeBar',
        'restrict' : 'E',
        'templateUrl' : '/directives/needle.html',
        'replace' : true
    }
  })
  .directive('videoHolder', function(){
    return {
        'restrict' : 'E',
      'transclude' : true,
        'templateUrl' : '/directives/videoHolder.html',
        'replace' : true
    } 
  })
