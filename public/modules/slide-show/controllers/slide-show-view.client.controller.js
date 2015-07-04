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







		var values = "100%;40% 60%;20 350;50% 50%;true;10%".split(";"),
			currentIndex = 0;

		//set the initial value
		TweenLite.set("#path", {visibility:"visible"});
		TweenLite.set("#code", {visibility:"visible"});

		$scope.AnimationNext = next;
		function next() {
			console.log('next');
			TweenLite.killTweensOf($scope.next);
			//in case the user clicks, clear any delayed calls to this method.
			if (++currentIndex === values.length) {
				currentIndex = 0;
			}
			if (values[currentIndex] === "true") {
				TweenLite.set("#current", {text:(values[currentIndex]), ease:Linear.easeNone});
			} else {
				TweenLite.set("#current", {text:('"' + values[currentIndex] + '"'), ease:Linear.easeNone});
			}
			TweenLite.to("#path", 1, {drawSVG:values[currentIndex], ease:Power1.easeInOut});

		}

	}
])
