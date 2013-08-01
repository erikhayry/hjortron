'use strict';

angular.module('svr2App')
  .service('rangeService', function() {

    var _this = this,
    	_sortRanges = function(array){
        	array.sort(function(a, b) {
          	 return a.start - b.start;
            })
        },
        _isValidRange = function(ranges, start, stop){
            return !(_this.hasRange(ranges, start) || _this.hasRange(ranges, stop)) &&
                start >= 0 && start <= 100 &&
                stop >= 0 && stop <= 100 &&
                start <= stop;
        }

  	this.getRanges = function(){
  		return [];
  	}

  	this.addRange = function(ranges, start, stop){
        if(_isValidRange(ranges, start, stop)){
      		var startPos = start || 0,
            stopPos = stop || 0;
        
            // add to time selector array
            ranges.push({'start': startPos, 'stop': stopPos});
            ranges = _sortRanges(ranges); // resort array so order is same as the visible order on time bar. This makes it's easier to find closest sibling later.

        }
        else throw {name : 'RangeError', message : 'Range values not valid'};
    	return ranges;
  	}

    this.getRange = function(ranges, index){
        return ranges[index];
    }

    this.updateRange = function(ranges, oldStart, start, stop){
        //if(typeof id !== undefined && _isValidRange(ranges, start, stop) && id < ranges.length){  
            var range = _this.getRange(ranges, _this.getRangeIndex(ranges, oldStart));
            range.start = start;
            range.stop = stop;
            ranges =  _sortRanges(ranges);
        //}
        return ranges;
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
        if(index != null){
            ranges.splice(index, 1);
            ranges = _sortRanges(ranges);
        }
        else throw {name : 'RangeError', message : 'Range value not found'};
        return ranges;
    }

    this.hasRange = function(ranges, value){
        for(var i = 0; i < ranges.length; i++){
            if(value >= ranges[i].start && value <= ranges[i].stop) return true;
        }
        return false;
    };


  });
