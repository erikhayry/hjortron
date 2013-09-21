'use strict';

angular.module('hjortronApp')
  .controller('ItemSetupCtrl', function ($scope, $route, elementLibrary, itemFactory) {
  		
  		function _init(){
  			//Based on http://www.bennadel.com/blog/2420-Mapping-AngularJS-Routes-Onto-URL-Parameters-And-Client-Side-Events.htm
  			$scope.$on("$routeChangeSuccess", function(){
  					var itemId = parseInt($route.current.params.itemId);
  					$scope.item = itemFactory.getItem(itemId)
  				}
  			);
  		}

		_init();
  });
