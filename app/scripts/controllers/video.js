'use strict';

angular.module('svr2App')
  .controller('VideoCtrl', function ($scope, pageFactory, videoFactory) { 	
  	var video,
  		init = function(){
	  		video = videoFactory.getVideo();
			video.currentTime = 0;
			$scope.video = video;			
  		};

  		init();

		
  	
  });
