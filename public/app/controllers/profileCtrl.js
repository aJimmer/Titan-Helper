angular.module('profileCtrl',['userService', 'authService'])
.directive('profile', function(){
		return {
			restrict: 'E',
			replace: false,
			template: '<div class="card card-block"><h4 class="card-title">Angel Jimenez</h4><p class="card-text">ajimmer</p><a href="#" ng-click="profile.updateUserName()" class="btn btn-dark">Update username</a> <a href="#" class="btn btn-dark">Update name</a></div>'	}
	})
.controller('profileController', function(User, Auth) {
	
	var vm = this;
	//vm.userInfo = Auth.getUser();
	vm.updateUserName = function(){
		console.log('update username' + ' ' + 'User: ' + Auth.getUser().name);

		//User.update();
	};
	vm.updateName = function(){
		console.log('update name');
		//User.update();
	};
});