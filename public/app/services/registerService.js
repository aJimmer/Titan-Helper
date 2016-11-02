angular.module('registerService', [])
	.factory('Register', function($http) {

		// create new object
		var regFactory = {};

		regFactory.create = function(regData) {
			
			return $http.post('/api/users/', regData);
		};

		return regFactory;
	})