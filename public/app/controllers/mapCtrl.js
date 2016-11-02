angular.module('mapCtrl',[])
.directive('mapPath', function(){
	return {
		restrict: 'E',
		replace: true,
		template: '<svg id="svg" height="650" width="725"></svg>'
	}
})
.controller('mapController', function(User){
	var vm = this;

	 console.log("Starting path...");
        var svg = d3.select(document.getElementById('svg'));
        var dur = 1500;

        //Start coordinates for all rooms
        var startX1 = 325;
        var startY1 = 330;

      //110B
      //Coords line 1
        var stopX1 = 325;
        var stopY1 = 107;

      //Coords line 2
        var stopX2 = 280;
        var stopY2 = 107;

        //Coords line 1
      var stopX1 = 325;
      var stopY1 = 187;
      
      //Coords line 2
      var stopX2 = 280;
      var stopY2 = 187;
      
      console.log("appending path...");
      //Animation line 1
      svg.append('line')
      .attr({
        x1: startX1,
        y1: startY1,
        x2: startX1,
        y2: startY1,
      })
      .transition()
      .duration(dur)
      .attr({
        x2: stopX1,
        y2: stopY1
      })
      console.log("appending path...");
      //Animation line 2
      svg.append('line')
      .attr({
        x1: stopX1,
        y1: stopY1,
        x2: stopX1,
        y2: stopY1,
      })
      .transition()
      .duration(dur)
      .attr({
        x2: stopX2,
        y2: stopY2
      });
});