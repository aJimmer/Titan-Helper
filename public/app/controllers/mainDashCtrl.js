angular.module('mainDashCtrl',[])
	.directive('dashboard', function(){
		return {
			restrict: 'E',
			replace: false,
			template: '<div class=""><div class="row"><div class="col-lg-4 col-sm-6 text-center"><a href="/dashboard" data-toggle="tooltip" data-placement="top" title="Find directions to a room from inside a building"><img class="img-circle img-responsive img-center" src="assets/img/maps.png"></div><div class="col-lg-4 col-sm-6 text-center"><a href="/todolist" data-toggle="tooltip" data-placement="top" title="Don\'t ever miss anything important with our to-do-list"><img class="img-circle img-responsive img-center" src="assets/img/checklist.png" alt=""></a></div><div class="col-lg-4 col-sm-6 text-center"><a href="/feed" data-toggle="tooltip" data-placement="top" title="Stay up-to-date with the latest campus news through our CSUF tailored twitter feed"><img class="img-circle img-responsive img-center" src="assets/img/twitter.png" alt=""></a></div></div><br><div class="row"><div class="col-lg-4 col-sm-6 text-center"><a href="/weather" data-toggle="tooltip" data-placement="top" title="Be prepared for rainy or shiny days, unlike our compiler teacher who wears scarfs on sunny days"><img class="img-circle img-responsive img-center" src="assets/img/cloud.png" alt=""></div></a><div class="col-lg-4 col-sm-6 text-center"><a href="/faq" data-toggle="tooltip" data-placement="top" title="Check out several FAQs if you need some help!"><img class="img-circle img-responsive img-center" src="assets/img/chat.png" alt=""></a></div><div class="col-lg-4 col-sm-6 text-center"><a href="/dashboard" data-toggle="tooltip" data-placement="top" title="Under Construction!"><img class="img-circle img-responsive img-center" src="assets/img/elephant.png" alt=""></div></div></div>'
		}
	})
	.controller('mainDashController', function(){
		$(document).ready(function(){
    	$('[data-toggle="tooltip"]').tooltip();   
});
	});