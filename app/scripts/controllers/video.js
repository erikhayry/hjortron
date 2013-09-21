'use strict';

/*
  Added to scope

  - objects
    video

  - functions
    onMouseClick
*/

angular.module('hjortronApp')
  .controller('VideoCtrl', function ($scope, videoFactory) { 	
  	var video,
    		init = function(){
  	  		video = videoFactory.getVideo();
    			video.currentTime = 0;
    			$scope.video = video;			
    		};

  		init();

      $scope.onMouseClick = function(e){
        videoFactory.updateVideo('dimensions', {'x' : e.x, 'y' : e.y})

        // video coordinates updated event broadcasted
        $scope.$emit('video-coordinates-updated', [e.x, e.y]);
      }
		
  	
  });
