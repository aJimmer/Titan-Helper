angular.module('feedCtrl',[])
	.directive('feed', function(){
		return {
			restrict: 'E',
			replace: true,
			template: '<a class="twitter-timeline" data-width="100%" position= center data-height="2000"	data-chrome="nofooter noheader"	href="https://twitter.com/search?q=from%3Aasicsuf%20OR%20from%3Acsuf%20OR%20from%3Afullertontitans" data-widget-id="796174191607226368">Tweets about from:asicsuf OR from:csuf OR from:fullertontitans</a>'
		}
	})
	.controller('feedController', function() {
		!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
		if(!d.getElementById(id)){js=d.createElement(s);
			js.id=id;js.src=p+"://platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js,fjs);
	}}(document,"script","twitter-wjs");
    
	})