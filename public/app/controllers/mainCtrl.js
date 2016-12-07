angular.module('mainCtrl', [])
.controller('mainController', function($rootScope, $location, Auth, AuthToken) {

	var token = AuthToken.getToken();
	if(!token)
		$location.path('/login');
	// bind this to vm (view-model)
	var vm = this;

	// define variables and objects on this
	// this lets them be availabe to our views
	// define a basic variable
	vm.welcome = 'Welcome to Find-a-Titan';
	vm.message = 'Helping you find your way...';
	vm.checkMap = 'Get directions';
	vm.alert = 'hide';

	// define a list of items
	vm.menu = [
		{ href: '/mainDashboard',icon : 'fa fa-street-view', title: 'Find-a-Titan' },
		{ href: '/mainDashboard', icon : 'fa fa-home', title: ' Home' },
		{ href: '/dashboard', icon : 'fa fa-location-arrow', title: 'Map' },
		{ href: '/todolist', icon : 'fa fa-shield', title: ' To Do List' },
		{ href: '/feed', icon : 'fa fa-twitter', title: 'Feed'},
		{ href: '/weather', icon : 'fa fa-sun-o', title: 'Weather'},
		{ href: '/faq', icon: 'fa fa-question-circle', title: 'FAQ'},
		{ href: '/floorDirectory', icon: 'fa fa-compass', title: 'Floor Directory' }
	];

	//get info if a person is logged in
	vm.loggedIn = Auth.isLoggedIn();

	// check to see if a user is logged in on every request

	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();
		// get user information on route change

		Auth.getUser()
			.then(function(data) {
				vm.user = data;
			});
	});

	vm.doLogin = function() {
		console.log('Trying to login...');
		vm.processing = true;

		// clear error
		vm.error = '';
		// call the Auth.login() function
		Auth.login(vm.loginData.username, vm.loginData.password)
			.then(function(data) {
				vm.processing = false;

				//$location.path('/dashboard');
				// if user successfully logs in, redirect to users page
				if(data.success) {
					console.log('go to home page..');
					$location.path('/mainDashboard');
				}
				else {
					vm.error = data.message;
					console.log('Something went wrong...' + data.message);
				}
				
			});
	};

	// function to handle logging out
	vm.doLogout = function() {
		Auth.logout();
		// reset all user info
		console.log('logging out...');
		vm.user = {};
		$location.path('/login');

		vm.alert = 'show';
	};
});
