"use strict";

/*
    Added to scope (make some more isolated?):
        needle: no service used
            value = current postion on the timebar
            isAddable = true if 

        ranges: get and sets all values in the itemFactory
            range: id same as index in the array
                start
                stop

        currentTimeBarTimeVar: contains value of the current ACTIVE range handler or needle. Used in the video controller

        onRangeHolderDrag() event
        onNeedleDrag() event

        addRange()
        removeRange()

*/

angular.module('svr2App')
  .controller('TimeBarCtrl', function ($scope, pageFactory, itemFactory, videoFactory) {
 // private variables
    var _rangeDragBol = false,
        _needleDragBol = false,
        _currentTimeRangeObj = {};

    function init() {
    	console.log('init TimeBarCtrl')
        //every time the needle or the ranges updates check status of needle
        function modelUpdate(){
            $scope.needle.isAddable = !$scope.item.hasRange($scope.needle.value);
        }

	    itemFactory.addItem(1).addItem(2);

	    var item1 = itemFactory.getItem(1);
	    var item2 = itemFactory.getItem(2);

        $scope.item = itemFactory.getItem(1);
        $scope.item.addRange(0, 10)
            .addRange(-10, 100)
            .addRange(20, 20)
            .addRange(80, 100)
            .addRange(60, 70)
            .addRange(30, 40)
            .removeRange(20)
            .removeRange(40)
            .updateRange(80, 90, 100);

        //Set needle values
        $scope.needle = {};

        // watch for changes to ranges and needle. (check performance)
        $scope.$watch('item',  modelUpdate, true);
        $scope.$watch('needle',  modelUpdate, true);

        $scope.needle.value = 0;

        //the currentTimeBarTimeVar is the only other value that should be used in other controllers.
        $scope.currentTimeBarTimeVar = $scope.needle.value;
    }

    init();

    /**
    * Update position of time range handler element
    *
    * @param xPos x position of pointer
    */

    // TODO refactor and make more readable
    function updateHandler(xPos) {
        var timeBar = pageFactory.getResource('timebar'),
            currentPos = xPos - pageFactory.getTimebar().left,
            // convert to percentage
            timeBarWidth = pageFactory.getTimebar().width,
            posPercentage = 100 * currentPos / timeBarWidth,

            // to prevent time range siblings overlap each other set gap value to be same as width of handler. Currently 10px hence the 10 below
            gap = 100 * 10 / timeBarWidth;

        //stop moving if handlers reach either end of time bar
        if (posPercentage > 100) {
          posPercentage = 100;
        }

        if (posPercentage < 0) {
          posPercentage = 0;
        }
        // range is currently being dragged 
        if(_rangeDragBol){
            // don't let start handler be after stop handler
            if(_currentTimeRangeObj.type === 'start'){
              // get closest siblings to current time range    
              var siblingObj = $scope.item.getRange(_currentTimeRangeObj.id - 1);  
              if(posPercentage > _currentTimeRangeObj.obj.stop) posPercentage = _currentTimeRangeObj.obj.stop;
              // don't let the handler go past closest sibling
              else if(siblingObj && siblingObj.stop > posPercentage - gap) {
                posPercentage = siblingObj.stop + gap;
              }
              $scope.item.updateRange(_currentTimeRangeObj.obj.start, posPercentage, _currentTimeRangeObj.obj.stop);
            }

            // don't let stop handler be before start handler
            if(_currentTimeRangeObj.type === 'stop'){
              // get closest siblings to current time range
              var siblingObj = $scope.item.getRange(_currentTimeRangeObj.id + 1);
              if(posPercentage < _currentTimeRangeObj.obj.start) posPercentage = _currentTimeRangeObj.obj.start;
              // don't let the handler go past closest sibling
              else if(siblingObj && siblingObj.start < posPercentage + gap) {
                posPercentage = siblingObj.start - gap;
              }
              $scope.item.updateRange(_currentTimeRangeObj.obj.start, _currentTimeRangeObj.obj.start, posPercentage);            
            }
        }

        // the needle is current being dragged    
        if(_needleDragBol){
            $scope.needle.value = posPercentage;
        }

        //set global timebar value TODO make working for range handler, currently not changing befoe needle is used
        $scope.currentTimeBarTime = posPercentage;
    }

    /*
        functions added to the scope
    */

    /**
    * onRangeHolderDrag initiates a range drag. Data later used on mousemove and mouseup events.
    *
    * @param event e
    * @param type is the type handler (start or stop)
    * @param start is the start value of current range
    */

    $scope.onRangeHolderDrag = function(e, type, start){
        var id = $scope.item.getRangeIndex(start);

        _rangeDragBol = true;

        // set this element to current
        _currentTimeRangeObj = {"obj": $scope.item.getRange(id),
                                "type": type,
                                "id": id
                            }; 
    }

    /**
    * onRangeHolderDrag initiates a range drag. Data later used on mousemove and mouseup events.
    *
    * @param event e
    * @param type is the type handler (start or stop)
    * @param start is the start value of current range
    */

    $scope.onRangeHolderHover = function(type, start){
        if(!_rangeDragBol){
            var id = $scope.item.getRangeIndex(start),
                range = $scope.item.getRange(id),
                position;

            (type === 'stop') ? position = range.stop : position = start;    

            console.log('hover ' + position);    //TODO add preview func
        }    
    }

    /**
    * onNeedleDrag initiates a needle drag. Data later used on mousemove and mouseup events.
    *
    * @param event e
    */

    $scope.onNeedleDrag = function(){
        _needleDragBol = true;
    }



    /**
    * addRange adds a new range to where ever the needle is AND if the there isn't a range in that space
    */

    $scope.addRange = function(){
        if($scope.needle.isAddable){
            $scope.item.addRange($scope.needle.value, $scope.needle.value);
        }
    }

    /**
    * removeRange removes a range based on it's start value
    *
    * @param start value of range
    */

    $scope.removeRange = function(start){
        $scope.item.removeRange(start);
    }

    /**
    * if a drag was going on, stop it
    * else if currently a drag is going on keep updating position of current time range element
    */

    $scope.$watch('mouse', function(){
        if (_rangeDragBol || _needleDragBol) {
            if($scope.mouse.mouseUp) _rangeDragBol = _needleDragBol = false;
            else updateHandler($scope.mouse.mousePosition);
        }
    }, true);
  });
