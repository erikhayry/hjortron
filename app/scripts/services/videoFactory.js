'use strict';

angular.module('hjortronApp')
  .service('videoFactory', function videoFactory() {
    var factory = {},
        video = {};

    factory.getVideo = function(){
        return video;
    }

    factory.updateVideo = function(name, value){
        video[name] = value; 
    }

    video = {
        'src' : 'assets/video/stockholm.mp4',
        'position' : 0 
    }

    return factory;  
});
