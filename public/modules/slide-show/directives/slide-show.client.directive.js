'use strict';

angular.module('slide-show').directive('slideShowCust', [
	function() {
		return {
			templateUrl: 'modules/slide-show/directives/template/slide-show.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				var
					slider = $('#slider'),
					slides = slider.children(),
					slideCount = slides.length,
					currentSlide = 0,
					duration = 4,
					fadeSpeed = 1,

					slide1 = $("#slide1"),
					slide2 = $("#slide2"),
					slide3 = $("#slide3"),

					playBtn = $("#playbtn"),
					pauseBtn = $("#pausebtn"),
					resumeBtn = $("#resumebtn"),
					stopBtn = $("#stopbtn"),
					restartBtn = $("#restartbtn"),
					reverseBtn = $("#reversebtn"),
					nextBtn = $("#nextbtn"),
					prevBtn = $("#prevbtn"),

					slide1Btn = $("#slide1btn"),
					slide2Btn = $("#slide2btn"),
					slide3Btn = $("#slide3btn"),

					progressBar = $("#progressBar"),
					tl = new TimelineMax({
						paused:true,
						repeat:1,
						//onComplete: restartTimeline,
						//onCompleteParams: ["{self}"],
						//onReverseComplete: reverseTimeline,
						//onReverseCompleteParams: ["{self}"]
					});

				updateZindex();


				///////////////////////////////////////////////////////
				// functions for building nested timelines
				function animateSlide1() {

					var slideTL1 = new TimelineMax({
						onComplete: prepNext,
						onCompleteParams: ["{self}", slide1]
					});

					slideTL1
						.add("slide1fade")
						.set(slide1,{'opacity':1})
						.add( TweenMax.to(slide1, fadeSpeed, {css:{autoAlpha:0}}) )
						.add("slide1afterfade")
						.add( TweenMax.to(slide1, duration) )
						.from(progressBar, slideTL1.duration(), {scaleX:0, transformOrigin:"0px 0px", ease:Linear.easeNone}, 0);

					return slideTL1;
				}

				function animateSlide2() {

					var slideTL2 = new TimelineMax({
						onComplete: prepNext,
						onCompleteParams: ["{self}", slide2]
					});

					slideTL2
						.add("slide2fade")
						//.set(slide2,{'opacity':1})
						.add(TweenMax.to(slide2, fadeSpeed, {css:{autoAlpha:0}}) )
						.add("slide2afterfade")
						.add(TweenMax.to(slide2, duration))
						.from(progressBar, slideTL2.duration(), {scaleX:0, transformOrigin:"0px 0px", ease:Linear.easeNone}, 0);

					return slideTL2;
				}

				function animateSlide3() {

					var slideTL3 = new TimelineMax({
						onComplete: prepNext,
						onCompleteParams: ["{self}", slide3]
					});

					slideTL3
						.add("slide3fade")
						//.set(slide3, {'opacity':1})
						.add(TweenMax.to(slide3, fadeSpeed, {css:{autoAlpha:0}}))
						.add("slide3afterfade")
						.add(TweenMax.to(slide3, duration))
						.from(progressBar, slideTL3.duration(), {scaleX:0, transformOrigin:"0px 0px", ease:Linear.easeNone}, 0);

					return slideTL3;
				}

				// update zindex on all slides
				function updateZindex(){

					$('#slider').children().css('zIndex',function(i){
						return slideCount-i;
					});
				}

				// prep next slide
				function prepNext(timeline, slide){
					slide.appendTo(slide.parent());
					updateZindex();
					timeline.set(slide,{autoAlpha:1});
					currentSlide = ++currentSlide % slideCount;
					//$('#msg').html(currentSlide);
				}

				function showProgress(timeline) {
					timeline.set(progressBar, {scaleX:timeline.progress(), transformOrigin: "0px 0px"});

				}


				slide1Btn.click(function() {
					tl.play("slide1afterfade");
				});

				//controls
				slide1Btn.click(function() {
					tl.play("slide1afterfade");
				});

				slide2Btn.click(function() {
					tl.play("slide2afterfade");
				});

				slide3Btn.click(function() {
					tl.play("slide3afterfade");
				});

				playBtn.click(function() {
					tl.play("slide1afterfade");
				});

				pauseBtn.click(function() {
					console.log('p');
					tl.pause();
				});

				resumeBtn.click(function() {
					tl.resume();
				});

				stopBtn.click(function() {
					tl.stop();
				});

				restartBtn.click(function() {
					tl.restart();
				});

				reverseBtn.click(function() {
					tl.reverse();
				});

				slider.on("mouseenter",function(){
					tl.pause();
				}).on("mouseleave",function(){
					tl.resume();
				});



					//////////////////////////////////
					// build timeline
						scope.build = function(){
						tl
							.add(animateSlide3(), "slide1")
							.add(animateSlide1(), "slide2")
							.add(animateSlide2(), "slide3")
							.play();
						}
				scope.build();


			}
		};
	}
]);