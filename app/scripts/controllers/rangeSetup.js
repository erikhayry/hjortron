'use strict';

angular.module('hjortronApp')
  .controller('RangeSetupCtrl', function ($scope, $route, itemFactory) {
		function _init(){
			$scope.range = {};

			//Based on http://www.bennadel.com/blog/2420-Mapping-AngularJS-Routes-Onto-URL-Parameters-And-Client-Side-Events.htm
			$scope.$on("$routeChangeSuccess", function(){
					var itemId = parseInt($route.current.params.itemId);
					$scope.item = itemFactory.getItem(itemId);
					$scope.range.start = parseInt($route.current.params.rangeStart);
				}
			)

			$scope.$on('video-coordinates-updated', function(e, arr) {
				console.log(arr)
				$scope.item.updateCoordinates($scope.range.start, arr[0], arr[1]);
				console.log($scope.item)
			});
		}

		_init();

		$scope.isActiveRange = function(rangeStart){
			if($scope.isDraggable(rangeStart)){
				return 'is-active';
			}
			else return '';
		}

		$scope.isDraggable = function(rangeStart){
			return ($scope.range.start == rangeStart);
		}

  });
