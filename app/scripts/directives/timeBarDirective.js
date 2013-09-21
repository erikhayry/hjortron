/**
Timebar directive

@property timeBar
@type directive
**/
angular.module('timeBarDirective', [])
	.directive('timeBar', function(elementLibrary){
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
		    elementLibrary.set('timebar', 'width', timebar.offsetWidth);
		    elementLibrary.set('timebar', 'left', findPos(timebar));
		  },

		  timebar = iElement[0];
		  setTimebar(timebar);
		}

		return {
			'link' : linker,
			'restrict' : 'E',
			'transclude' : true,
			'templateUrl' : '/directives/timeBar.html',
			'replace' : true
		}
	})