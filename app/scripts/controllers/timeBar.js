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
  .controller('TimeBarCtrl', function ($scope, pageFactory, itemFactory, timeBarService, videoFactory) {
 // private variables
    var _rangeDragBol = false,
        _needleDragBol = false,
        _currentTimeRangeObj = {};

    function init() {
        //every time the needle or the ranges updates check status of needle
        function modelUpdate(){
            $scope.needle.isAddable = !$scope.item.hasRange($scope.needle.value); //need a test?
        }

	    itemFactory.addItem(1).addItem(2);

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
    * @param xPosition x position of pointer
    */

    function updateHandler(xPosition) {
        var timeBarValues = timeBarService.getTimeBarValues(xPosition);    

        // range is currently being dragged
        if(_rangeDragBol){
            var newRangeValues = timeBarService.getRangeValues(_currentTimeRangeObj, timeBarValues.position, timeBarValues.gap);
            $scope.item.updateRange(newRangeValues.oldstart, newRangeValues.start, newRangeValues.stop);
        }

        // the needle is current being dragged    
        if(_needleDragBol){
            $scope.needle.value = timeBarService.getNeedleValue(timeBarValues.position);
        }

        //set global timebar value TODO make working for range handler, currently not changing befoe needle is used
        $scope.currentTimeBarTime = timeBarValues.position;
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
        _currentTimeRangeObj = {"item": $scope.item,
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
        console.log('remove')
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
