'use strict';

angular.module('svr2App')
  .service('videoFactory', function videoFactory() {
    var factory = {},
        video = {};

    factory.getVideo = function(){
        return video;
    }

    factory.updateVideo = function(obj){
        video[obj.type] = obj.value; 
    }

    video = {
        'src' :'assets/video/stockholm.mp4'
    }

    return factory;  
});
