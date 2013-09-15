'use strict';

angular.module('hjortronApp')
  .service('videoFactory', function videoFactory() {
    var factory = {},
        video = {};

    // TODO write test   
    factory.getVideo = function(){
        return video;
    }

    // TODO write test
    factory.updateVideo = function(name, value){
        video[name] = value;
    }

    video = {
        'src' : 'assets/video/stockholm.mp4',
        'position' : 0 
    }

    return factory;  
});
