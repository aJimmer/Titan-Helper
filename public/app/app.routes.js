// inject ngRoute for all our routing needs
angular.module('routerRoutes', ['ngRoute'])

//configure our routes
.config(function($routeProvider, $locationProvider) {
	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl: 'app/views/pages/login.html'
		})
		.when('/login', {
			templateUrl: 'app/views/pages/login.html',
			controller: 'mainController',
			controllerAs: 'login'
		})
		.when('/register', {
			templateUrl: 'app/views/pages/register.html',
			controller: 'registerController',
			controllerAs: 'register'
		})
		.when('/dashboard', {
			templateUrl: 'app/views/pages/dashboard.html',
			controller: 'dashboardController',
			controllerAs: 'dashboard'
		})
		.when('/about', {
			templateUrl: 'app/views/pages/about.html',
			controller: 'aboutController',
			controllerAs: 'about'
		})
		.when('/contact', {
			templateUrl: 'app/views/pages/contact.html',
			controller: 'contactController',
			controllerAs: 'contact'
		})
		.when('/map', {
			templateUrl: 'app/views/pages/map.html',
			controller: 'mapController',
			controllerAs: 'map'
		})
		.when('/todolist', {
			templateUrl: 'app/views/pages/toDoList.html',
			controller: 'todolistController',
			controllerAs: 'todolist'
		});

		// set our app up to have pretty URLS
		$locationProvider.html5Mode(true);
});