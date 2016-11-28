angular.module('mapService', [])
	.factory('Map', function($http) {
		// create new object
		var mapFactory = {};

		mapFactory.get = function(){
			console.log('getting yo building son!');
			return $http.get('/building-api/buildings');
		};
		
		return mapFactory;
	}); 