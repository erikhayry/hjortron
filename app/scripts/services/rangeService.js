'use strict';

angular.module('svr2App')
  .service('rangeService', function() {

    var _this = this,
    	_sortRanges = function(array){
        	array.sort(function(a, b) {
          	return a.start - b.start;
        });
    }

  	this.getRanges = function(){
  		return [];
  	}

  	this.addRange = function(ranges, start, stop){
  		var startPos = start || 0,
        stopPos = stop || 0;
    
        // add to time selector array
        ranges.push({'start': startPos, 'stop': stopPos});

        // resort array so order is same as the visible order on time bar. This makes it's easier to find closest sibling later.
    	return _sortRanges(ranges);
  	}

    this.getRange = function(ranges, index){
        return ranges[index];
    }

    this.updateRange = function(ranges, id, start, stop){
        var range = _this.getRange(ranges, id);
        range.start = start;
        range.stop = stop;
        return _sortRanges(ranges);
    }

    this.getRangeIndex = function(ranges, start){
        for(var i = 0; i < ranges.length; i++){
            if(ranges[i].start == start){
                return i;
            }
        }
        return null;
    }

    this.removeRange = function(ranges, start){
        var index = _this.getRangeIndex(ranges, start);
        if(typeof index != undefined){
            ranges.splice(index, 1);
            ranges = _sortRanges(ranges);
        }
        return ranges;
    }

    this.hasRange = function(ranges, value){
        for(var i = 0; i < ranges.length; i++){
            if(value >= ranges[i].start && value <= ranges[i].stop) return true;
        }
        return false;
    };


  });
