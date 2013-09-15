'use strict';

angular.module('hjortronApp')
  .service('timeBarFactory', function timeBarFactory(appFactory) {
    // AngularJS will instantiate a singleton by calling "new" on factory function
    var factory = {};

    // TODO write test
    factory.getTimeBarValues = function(xPosition){
	    var currentPos = xPosition - appFactory.getTimebar().left,
        
        // convert to percentage
        timeBarWidth = appFactory.getTimebar().width,
        position = 100 * currentPos / timeBarWidth,

        // to prevent time range siblings overlap each other set gap value to be same as width of handler. Currently 10px hence the 10 below
        gap = 100 * 10 / timeBarWidth;

        return{
        	gap : gap,
        	position : position
        }
    }

    factory.getNeedleValue = function(position){
        if (position > 100) {
          position = 100;
        }

        if (position < 0) {
          position = 0;
        }

        return position;    	
    }

    factory.getRangeValues = function(currentTimeRangeObj, position, gap){ // TODO move gap and position?
    	var object = currentTimeRangeObj.item.getRange(currentTimeRangeObj.id),
    		rangeValues = {},
    		siblingObj = {},
    		type = currentTimeRangeObj.type;

    	//stop moving if handlers reach either end of time bar
        if (position > 100) {
          position = 100;
        }

        if (position < 0) {
          position = 0;
        }
        // don't let start handler be after stop handler
        if(type === 'start'){

          // get closest siblings to current time range
          siblingObj = currentTimeRangeObj.item.getRange(currentTimeRangeObj.id - 1);  
          
          if(position > object.stop) position = object.stop;
          
          // don't let the handler go past closest sibling
          else if(siblingObj && siblingObj.stop > position - gap) {
            position = siblingObj.stop + gap;
          }
          
          rangeValues = {
          	oldstart : object.start, // TODO is this needed?
          	start : position,
          	stop : object.stop
          }
        }

        // don't let stop handler be before start handler
        if(type === 'stop'){
          
          // get closest siblings to current time range
          siblingObj = currentTimeRangeObj.item.getRange(currentTimeRangeObj.id + 1);

          if(position < object.start) position = object.start;
          
          // don't let the handler go past closest sibling              
          else if(siblingObj && siblingObj.start < position + gap) {
            position = siblingObj.start - gap;
          }
          
          rangeValues = {
          	oldstart : object.start, // TODO is this needed?
          	start : object.start,
          	stop : position
          }
        }
    	return rangeValues;
    }
    return factory;
  });
