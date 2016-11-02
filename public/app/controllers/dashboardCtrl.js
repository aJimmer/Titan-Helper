angular.module('dashboardCtrl', ['userService'])
	.controller('dashboardController', function($location, User){
	var vm = this;
	
	// define variables and objects on this
	// this lets them be availabe to our views
	// define a basic variable
	vm.message = 'Where would you like to go?';
	vm.checkMap = 'Get directions';
	vm.destinationInfo = {};
	vm.destination={};

	vm.findRoute = function(){
		vm.destinationInfo = {
			roomNumber: vm.destination.roomNumber,
			floorNumber: vm.destination.floorNumber,
			building: vm.destination.building
		};
		console.log(vm.destinationInfo);
		vm.destination = {};
		$location.path('/map');
	};
});