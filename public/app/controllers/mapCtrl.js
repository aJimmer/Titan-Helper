angular.module('mapCtrl',['userService','mapService'])
  .directive('mapPath', function(){
  	return {


  		restrict: 'E',
  		replace: true,
  		template: '<svg id="svg" height="650" width="725"></svg>'

  	}
  })
  .controller('mapController', function($location, User, Map){
    var vm = this;

    /* Path Variables */

    vm.message = 'Where would you like to go?';
    vm.checkMap = 'Get directions';
    vm.destinationInfo = {};
    vm.destination = {};
    vm.buidlings;

  vm.findRoute = function(){ 
      vm.destinationInfo = {
          roomNumber: vm.destination.roomNumber,
          floorNumber: vm.destination.floorNumber,
          building: vm.destination.building
      };
      console.log(vm.destinationInfo);
      vm.destination = {};
      $location.path('/map');
      /*
      Map.getByName(vm.destination.buidling)
        .then(function(data) {

        })
      */
      Map.get()
        .then(function(data) {
          //console.log('data: ' + data);
          
          //console.log('buildings: ' + vm.buildings);
          //vm.startPath(vm.buildings);
          //console.log(data);

          if(data){
            //vm.buidlings = data.data;
            for(var i = 0; i < data.data.length; i++){
              if(data.data[i].name === vm.destinationInfo.building){
                for(var j = 0; j < data.data[i].rooms.length; j++){
                  if(data.data[i].rooms[j].roomNum === vm.destinationInfo.roomNumber){

                      console.log('Starting path to: ' + data.data[i].name + ' Room: ' + data.data[i].rooms[j].roomNum);
                      console.log('Rendering path...');

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

                      //if ( == 5)
                      //Coords line 1
                      stopX1 = data.data[i].rooms[j].path[0];
                      stopY1 = data.data[i].rooms[j].path[1];
                        
                      //Coords line 2
                      stopX2 = data.data[i].rooms[j].path[2];
                      stopY2 = data.data[i].rooms[j].path[3];

                      /*
                      function renderCont(data){

                      } 
                      */ 
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
                          }).each("end", function (){
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
                  }
                } 
                  //console.log(data.data[i].name + ' ' + data.data[i].rooms.length);         
              }
            }
          }
        });
  };

  

});