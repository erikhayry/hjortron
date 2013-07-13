'use strict';

angular.module('svr2App')
  .controller('PageCtrl', function ($scope, pageFactory) {
	init();

	function init(){
		$scope.mouse = pageFactory.getMouse();
		//$scope.elements = pageFactory.getElements();
	}

	$scope.onMouseMove = function(e){
		pageFactory.setMouse('mousePosition', e.x);
	}

	$scope.onMouseAction = function(up){
		pageFactory.setMouse('mouseUp', up);
	}
  });
