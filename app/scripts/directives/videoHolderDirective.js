/**
  videoHolder directive

  @property videoHolder
  @type directive
**/
angular.module('videoHolderDirective', [])
  .directive('videoHolder', function(videoFactory){
    var linker = function($scope, iElement, $window){
      var videoEl = iElement[0].getElementsByTagName('video')[0]; 
      
      $scope.$watch('currentTimeBarTime', function(){      
        try{
          videoEl.currentTime = $scope.currentTimeBarTime;
         }
        catch(error){
          console.log(error)
        }
      });

/*      function updateDimensions(){
        console.log(iElement)
        try{
          videoFactory.updateVideo('dimensions', { 'width' : videoEl.offsetWidth, 'height' : videoEl.offsetHeight })
        }
        catch(error){
          console.log(error);
        }        
      }

      updateDimensions();*/

    }

    return {
        'link' : linker,
        'restrict' : 'E',
        'transclude' : true,
        'templateUrl' : '/directives/videoHolder.html',
        'replace' : true
    } 
  })