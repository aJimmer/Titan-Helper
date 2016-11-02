angular.module('authService', [])

// =============================================
// auth factory to login and get information
// inject $http for communicating with the API
// inject $q to return promise objects
// inject AuthToken to manage tokens
// =============================================
.factory('Auth', function($http, $q, AuthToken) {

	// create auth factory object
	var authFactory = {};

	// log a user in
	authFactory.login = function(username, password) {
		// return the promise object and its data
		return $http.post('/api/authenticate', {
			username: username,
			password: password
		})
		.then(function(data) {
			AuthToken.setToken(data.data.token);
			return data.data;
		});
	};

	// log a userout by clearing the token
	authFactory.logout = function() {
		// clear token
		AuthToken.setToken();
	};

	// check if user is logged in
	// check if there is a local token
	authFactory.isLoggedIn = function() {

		if (AuthToken.getToken()) {
			return true;
		}
		else {
			return false;
		}
	};

	// get the logged in user
	authFactory.getUser = function() {
		if(AuthToken.getToken())
			return $http.get('/api/me', { cache: true });
		else 
			return $q.reject({ message: 'User has no token.'});

	};

	// return auth factory object
	return authFactory;
})

// =============================================
// factory for handling tokens
// inject $window to store token client-side
// =============================================

.factory('AuthToken', function($window) {
	
	var authTokenFactory = {};

	// get token
	authTokenFactory.getToken = function() {
		var token = $window.localStorage.getItem('token');
		return token;
	}

	// function to set token or clear token
	// if a token is passed , set the token
	// if there is not token, clear it from local storage

	authTokenFactory.setToken = function(token){

		if(token) {
			$window.localStorage.setItem('token', token);
		}
		else{
			$window.localStorage.removeItem('token');
		}
	};

	return authTokenFactory;
})

// =============================================
// application configuration to integrate token into requests
// =============================================

.factory('AuthInterceptor', function($q, $location, AuthToken) {

	var interceptorFactory = {};

	// this will happen on all http requests
	interceptorFactory.request = function(config) {

		var token = AuthToken.getToken();
		// if the token exists, add it to the header as x-access-token
		if (token) 
			config.headers['x-access-token'] = token;

		return config;
	};

	// happens on response errors
	interceptorFactory.responseError = function(response) {

		// if our server returns a 403 forbidden response
		if (response.status == 403) {
			AuthToken.setToken();
			$location.path('/login');
		}

		// return the errors from the server as a promise
		return $q.reject(response);
	};
	
	return interceptorFactory;
});