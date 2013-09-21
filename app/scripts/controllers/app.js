'use strict';

angular.module('hjortronApp')
  .controller('AppCtrl', function ($scope, mouseFactory, itemFactory, errorFactory) {

	function _init(){
		$scope.errors = errorFactory.getErrors();

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

	_init();

	$scope.onMouseMove = function(e){
		mouseFactory.setMouse('mousePosition', e.x);
	}

	$scope.onMouseAction = function(isUp){
		mouseFactory.setMouse('mouseUp', isUp);
	}
  });
