'use strict';

angular.module('slide-show').controller('SlideShowViewController', ['$scope',
	function($scope) {
		// Slide show view controller logic
		// ...

		TweenLite.defaultEase = Power3.easeInOut;

		//responsive timeline animation.
		//values recorded once, nothing changes on resize
		var tl = new TimelineMax({repeat:-1, yoyo:true, repeatDelay:1})
		tl.from(".red", 1, {xPercent:-100, force3D:true})
			.to(".red", 1, {xPercent:100}, "+=3")
			//.to(".red", 1, {yPercent:100}, "+=4");
		tl.play(5); //start at 5-seconds in just because it looks better initially (totally subjective).

		var $device = $(".device");
		//jQueryUI Slider to simulate change in screen size
		$("#sliderGsap").slider({
			range: false,
			min: 50,
			max: 95,
			step: 0.02,
			value:70,
			slide: function ( event, ui ) {
				$device.css("width", ui.value + "%");
			}
		});

		$scope.phones = [
			{ type: 'Office', number: '(xxx) xxx-xxxx' },
		];
	}
]);