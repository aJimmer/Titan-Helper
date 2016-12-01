angular.module('weatherCtrl',[])
	.directive('weather', function(){
		return {
			restrict: 'E',
			replace: false,
			template: '<div class="container-fluid"> <div class=\'location\'></div><div class=description></div><div class=\'icon\'></div><div class=\'temp\'><button class=\'btn2 btn-primary\'></button></div><img class=\'humidityIcon\' src="assets/img/humidity.png" alt=\'humidity\'><div class=\'humidity\'>Humidity<br></div><img class=\'windIcon\' src="assets/img/wind.png" alt="Wind"><div class=\'wind\'>Wind<br></div></div>'

		}
	})
	.controller('weatherController', function(){
				
		$(document).ready(function() {

		  getLocation();

		  function getLocation() {
		    $.get("https://ipinfo.io", function(location) {
		      console.log(location);
		      $('.location').append("Fullerton, ").append("California");
		      getWeather("33.880625,-117.886072;");
		    }, 'jsonp');
		  }
		  //get weather
		  function getWeather(loc) {
		    var lat = loc.split(",")[0];
		    var lon = loc.split(",")[1];
		    //var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=9caef11b776d4c210cca3f8ebeba530c&units=" + unitDefault;
		    var API_KEY = "c86054163208f8a793a32241fc40b145";

		    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?id=5351247" + "&appid=" + API_KEY + "&units=imperial";
		    console.log(weatherApiUrl);

		    $.get(weatherApiUrl, function(weather) {
		      var temperature = weather.main.temp;
		      temperature = ((temperature).toFixed(0));
		      var humidity = weather.main.humidity;
		      var description = weather.weather[0].description.toUpperCase()
		      var wind = (weather.wind.speed).toFixed(1);
		      var iconNum = weather.weather[0].icon;

		      $('.icon').append("<img src='https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png'>");
		      $('.btn2').html(temperature + '\xB0 F');

		      $('.humidity').append(humidity + '%');
		      $('.wind').append(wind + ' mph');
		      $('.description').html(description);

		      var mph = (wind * 1.609344).toFixed(1);
		      var temp2 = ((temperature - 32) * 5 / 9).toFixed(0);
		      $("button").click(function() {
		        if ($('.btn2').is(":contains('\xB0 F')")) {
		          $('.btn2').html(temp2 + '\xB0 C');
		          $('.wind').html('Wind:<br>' + mph + ' kph')
		        } else {
		          $('.btn2').html(temperature + '\xB0 F');
		          $('.wind').html('Wind:<br>' + wind + ' mph');
		        }
		      });
		    }, 'jsonp')
		  }
		});

	});