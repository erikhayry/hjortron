'use strict';

angular.module('svr2App')
  .service('timeBarService', function timeBarService() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var _this = this;

    this.getRangeValues = function(currentTimeRangeObj, position, gap){
    	console.log(currentTimeRangeObj)
    	var object = currentTimeRangeObj.item.getRange(currentTimeRangeObj.id),
    		rangeValues = {},
    		siblingObj = {},
    		type = currentTimeRangeObj.type ;

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
          	oldstart : object.start,
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
          	oldstart : object.start,
          	start : object.start,
          	stop : position
          }
        }
    	return rangeValues;
    }
  });
