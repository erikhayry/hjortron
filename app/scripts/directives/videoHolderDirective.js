/**
  videoHolder directive

  @property videoHolder
  @type directive
**/

angular.module('videoHolderDirective', [])
  .directive('videoHolder', function(videoFactory){
    var linker = function($scope, iElement){
      $scope.$watch('currentTimeBarTime', function(){
          var videoEl = iElement[0].getElementsByTagName('video')[0];          
          try{
            videoEl.currentTime = $scope.currentTimeBarTime;
           }
          catch(error){
            console.log(error)
          }

      })
    }

    return {
        'link' : linker,
        'restrict' : 'E',
        'transclude' : true,
        'templateUrl' : '/directives/videoHolder.html',
        'replace' : true
    } 
  })