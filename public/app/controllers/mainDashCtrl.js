angular.module('mainDashCtrl',[])
	.directive('dashboard', function(){
		return {
			restrict: 'E',
			replace: false,
			template: '<div class=""><div class="row"><div class="col-lg-4 col-sm-6 text-center"><a href="/dashboard"><img class="img-circle img-responsive img-center" src="assets/img/maps.png"></div><div class="col-lg-4 col-sm-6 text-center"><a href="/todolist"><img class="img-circle img-responsive img-center" src="assets/img/checklist.png" alt=""></a></div><div class="col-lg-4 col-sm-6 text-center"><a href="/feed"><img class="img-circle img-responsive img-center" src="assets/img/twitter.png" alt=""></a></div></div><br><div class="row"><div class="col-lg-4 col-sm-6 text-center"><a href="/weather"><img class="img-circle img-responsive img-center" src="assets/img/cloud.png" alt=""></div></a><div class="col-lg-4 col-sm-6 text-center"><a href="/faq"><img class="img-circle img-responsive img-center" src="assets/img/chat.png" alt=""></a></div><div class="col-lg-4 col-sm-6 text-center"><img class="img-circle img-responsive img-center" src="assets/img/elephant.png" alt=""></div></div></div>'
		}
	})
	.controller('mainDashController', function(){

	});