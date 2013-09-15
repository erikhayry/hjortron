'use strict';

angular.module('hjortronApp')
  .controller('VideoCtrl', function ($scope, appFactory, videoFactory) { 	
  	var video,
    		init = function(){
  	  		video = videoFactory.getVideo();
    			video.currentTime = 0;
    			$scope.video = video;			
    		};

  		init();

      $scope.onMouseClick = function(e){
        videoFactory.updateVideo('dimensions', {'x' : e.x, 'y' : e.y})
        $scope.$emit('video-coordinates-updated', [e.x, e.y]);
      }
		
  	
  });
