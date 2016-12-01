angular.module('regCtrl',['registerService'])
.controller('registerController', function(Register) {
	var vm = this;
	vm.alert = 'hide';
	vm.doRegister = function() {
		console.log('Trying to register...');
		console.log(vm.regData);
		vm.processing = true;

		/// clear error 
		vm.error = '';
		vm.message = '';

		Register.create(vm.regData)
			.then(function(data) {
				vm.processing = false;

				vm.regData = {};
				vm.message = data.message;
				vm.alert = 'show';
			});
	};
});