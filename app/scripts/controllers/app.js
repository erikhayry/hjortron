'use strict';

angular.module('hjortronApp')
  .controller('AppCtrl', function ($scope, appFactory, itemFactory, errorFactory) {
	init();

	function init(){
		$scope.mouse = appFactory.getMouse();
		$scope.errors = errorFactory.getErrors();
		//$scope.elements = appFactory.getElements();

		var itemId = 1;
		if(!itemFactory.getItem(itemId)){
			itemFactory.addItem(itemId).addItem(itemId + 1);

	        var item = itemFactory.getItem(itemId);
	        item.addRange(0, 10)
	            .addRange(-10, 100)
	            .addRange(20, 20)
	            .addRange(80, 100)
	            .addRange(60, 70)
	            .addRange(30, 40)
	            .removeRange(20)
	            .removeRange(40)
	            .updateRange(80, 90, 100);
        }
	}

	$scope.onMouseMove = function(e){
		appFactory.setMouse('mousePosition', e.x);
	}

	$scope.onMouseAction = function(up){
		appFactory.setMouse('mouseUp', up);
	}

	$scope.items = itemFactory.getItems();

  });
