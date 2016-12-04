// name our app
angular.module('find-a-titan', [
	'routerRoutes', 
	'ngAnimate',
	'authService',
	'mainCtrl',
	'userCtrl',
	'regCtrl',	
	'userService',
	'dashboardCtrl',
	'mapCtrl',
	'mapService',
	'todolistCtrl',
	'feedCtrl',
	'weatherCtrl',
	'faqCtrl',
	'mainDashCtrl',
	'profileCtrl' 
	])
	// application configuration to integrate token into requests
	.config(function($httpProvider){
		// attach our auth interceptor to the http requests
		$httpProvider.interceptors.push('AuthInterceptor');
	});
