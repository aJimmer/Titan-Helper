angular.module('faqCtrl', [])
	.directive('faq', function(){
		return {
			restrict: 'E',
			replace: false,
			template: '<section class="cd-faq"><div class="cd-faq-items"><div class="jumbotron"><h3 class="apple">FAQ</h3><ul id="basics" class="cd-faq-group"><li class="cd-faq-title"></li>			<li><a class="cd-faq-trigger" href="#0">How to get directions to a room?</a><div class="cd-faq-content"><p>I\'m happy to say you\'ve come to the right place!</p><p></p><p>On the main page, you see three fields. Enter the room number you\'re looking for and whihc building it\'s in. If you do not know which building we will help you with a list. </p><p>Afterwords, press "find" and you will automatically be directed to our awesome mapping service to give you the directions you want, when you want it(that is right now)!</p></div></li>			<li><a class="cd-faq-trigger" href="#0">How do I sign up?</a><div class="cd-faq-content"><p>So you wanna take your direction searching to the next level? Great!</p><p></p><p>Press the account tab on the right side of the screen and you will arrive to the login screen. Press "make an account" and fill in the info. Welcome to your life 2.0!</p></div></li>						<li><a class="cd-faq-trigger" href="#0">Latest Cal State news</a><div class="cd-faq-content"><p>So you wanna know what\'s up at campus? Wanna be the IT-guy/girl/whateveryouidentifywith? We gotchu! </p><p>First, admire our butiful menu and then click the option that says "News"</p><p>You will now see Cal States twitter feed, hurrayy!</p></div></li>						<li><a class="cd-faq-trigger" href="#0">How do I change my password?</a><div class="cd-faq-content"><p>Unfortunetaly, Angel thinks this is hard so we might not implement it. Maybe if you buy him a beer and a burger he will work on it.</p><p>Stay tuned</p></div></li>						<li><a class="cd-faq-trigger" href="#0">How do I use the To-do-list?</a><div class="cd-faq-content"><p>Got to much going on in your head? Let it out on our to-do-list to relax!</p><p>I still dont know how this shit works, but I\'ll learn soon enough</p></div></li>			<li><a class="cd-faq-trigger" href="#0">How\'s the weather gonna be on campus?</a><div class="cd-faq-content"><p>Should you bring that sweatshirt to school or not? You planning any romantic kisses in the rain? Let our weather app solve all those life changing problems for you!</p><p>In the menu system, click on weather, and our genious weather app iwth show you the local weather for the day on CSUF campus!</p></div></li></ul></div></div><a href="#0" class="cd-close-panel">Close</a></section>' 		}
	})
	.controller('faqController',function(){
		jQuery(document).ready(function($){
	//update these values if you change these breakpoints in the style.css file (or _layout.scss if you use SASS)
	var MqM= 768,
		MqL = 1024;

	var faqsSections = $('.cd-faq-group'),
		faqTrigger = $('.cd-faq-trigger'),
		faqsContainer = $('.cd-faq-items'),
		faqsCategoriesContainer = $('.cd-faq-categories'),
		faqsCategories = faqsCategoriesContainer.find('a'),
		closeFaqsContainer = $('.cd-close-panel');
	
	//select a faq section 
	faqsCategories.on('click', function(event){
		event.preventDefault();
		var selectedHref = $(this).attr('href'),
			target= $(selectedHref);
		if( $(window).width() < MqM) {
			faqsContainer.scrollTop(0).addClass('slide-in').children('ul').removeClass('selected').end().children(selectedHref).addClass('selected');
			closeFaqsContainer.addClass('move-left');
			$('body').addClass('cd-overlay');
		} else {
	        $('body,html').animate({ 'scrollTop': target.offset().top - 19}, 200); 
		}
	});

	//close faq lateral panel - mobile only
	$('body').bind('click touchstart', function(event){
		if( $(event.target).is('body.cd-overlay') || $(event.target).is('.cd-close-panel')) { 
			closePanel(event);
		}
	});
	faqsContainer.on('swiperight', function(event){
		closePanel(event);
	});

	//show faq content clicking on faqTrigger
	faqTrigger.on('click', function(event){
		event.preventDefault();
		$(this).next('.cd-faq-content').slideToggle(200).end().parent('li').toggleClass('content-visible');
	});

	//update category sidebar while scrolling
	$(window).on('scroll', function(){
		if ( $(window).width() > MqL ) {
			(!window.requestAnimationFrame) ? updateCategory() : window.requestAnimationFrame(updateCategory); 
		}
	});

	$(window).on('resize', function(){
		/*if($(window).width() <= MqL) {
			faqsCategoriesContainer.removeClass('is-fixed').css({
				'-moz-transform': 'translateY(0)',
			    '-webkit-transform': 'translateY(0)',
				'-ms-transform': 'translateY(0)',
				'-o-transform': 'translateY(0)',
				'transform': 'translateY(0)',
			});
		}*/	
		if( faqsCategoriesContainer.hasClass('is-fixed') ) {
			faqsCategoriesContainer.css({
				'left': faqsContainer.offset().left,
			});
		}
	});

	function closePanel(e) {
		e.preventDefault();
		faqsContainer.removeClass('slide-in').find('li').show();
		closeFaqsContainer.removeClass('move-left');
		$('body').removeClass('cd-overlay');
	}

	function updateCategory(){
		updateCategoryPosition();
		updateSelectedCategory();
	}

	function updateCategoryPosition() {
		var top = $('.cd-faq').offset().top,
			height = jQuery('.cd-faq').height() - jQuery('.cd-faq-categories').height(),
			margin = 20;
		
		/*if( top - margin <= $(window).scrollTop() && top - margin + height > $(window).scrollTop() ) {
			var leftValue = faqsCategoriesContainer.offset().left,
				widthValue = faqsCategoriesContainer.width();
			faqsCategoriesContainer.addClass('is-fixed').css({
				'left': leftValue,
				'top': margin,
				'-moz-transform': 'translateZ(0)',
			    '-webkit-transform': 'translateZ(0)',
				'-ms-transform': 'translateZ(0)',
				'-o-transform': 'translateZ(0)',
				'transform': 'translateZ(0)',
			});
		} else if( top - margin + height <= $(window).scrollTop()) {
			var delta = top - margin + height - $(window).scrollTop();
			faqsCategoriesContainer.css({
				'-moz-transform': 'translateZ(0) translateY('+delta+'px)',
			    '-webkit-transform': 'translateZ(0) translateY('+delta+'px)',
				'-ms-transform': 'translateZ(0) translateY('+delta+'px)',
				'-o-transform': 'translateZ(0) translateY('+delta+'px)',
				'transform': 'translateZ(0) translateY('+delta+'px)',
			});
		} else { 
			faqsCategoriesContainer.removeClass('is-fixed').css({
				'left': 0,
				'top': 0,
			});
		}*/
	}

	function updateSelectedCategory() {
		faqsSections.each(function(){
			var actual = $(this),
				margin = parseInt($('.cd-faq-title').eq(1).css('marginTop').replace('px', '')),
				activeCategory = $('.cd-faq-categories a[href="#'+actual.attr('id')+'"]'),
				topSection = (activeCategory.parent('li').is(':first-child')) ? 0 : Math.round(actual.offset().top);
			
			if ( ( topSection - 20 <= $(window).scrollTop() ) && ( Math.round(actual.offset().top) + actual.height() + margin - 20 > $(window).scrollTop() ) ) {
				activeCategory.addClass('selected');
			}else {
				activeCategory.removeClass('selected');
			}
		});
	}
});
	});