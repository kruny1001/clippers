'use strict';

angular.module('slide-show').directive('slideShowHome', slideShowHome);

	function slideShowHome($compile, $mdIcon) {
		return {
			restrict: 'E',
			controller: slideShowHomeCtrl,
			link: function postLink(scope, element, attrs) {
				var svgUrl = 'modules/slide-show/img/logo/barberLogo.svg';
				var container = element;
				var slideWrapper = angular.element('<div class="slider-wrapper"></div>');
				var svgContainer = angular.element('<div class="slide-home-svgLogo"></div>');
				var wrapper = angular.element('<div class="slideHome"></div>');
				var svgLogo;

				$mdIcon('barbersLook').then(function(iconEl){
					svgContainer.append(iconEl)
					svgLogo = iconEl;
					scope.check(element, svgLogo);
				});

				//svgContainer.append(svg1);
				wrapper.append(svgContainer);
				slideWrapper.append(wrapper);
				element.append(slideWrapper);
			}
		};
	}

function slideShowHomeCtrl($scope, $mdIcon){
	$scope.check = function(element, svg){

		var temp = $(element);
		var svgContainer = temp.find('svg');
		var texts = $(svg);
		var LookText = texts.find('#Barber');
		var BarberText = texts.find('#Look');
		var svgBody = temp.find('.slide-home-svgLogo');
		var barbersLoogLogo;

		//var text1 = angular.element('<div>Lower Price</div>')
		//text1.css('display','none');
		//text1.css('textAlign','center');
		//element.append(text1);

		var logoPromise= $mdIcon('barbersLookText').then(function(iconEl){
			//iconEl.css("display", 'none');
			svgBody.append(iconEl)
			barbersLoogLogo = $(iconEl);
			console.log(barbersLoogLogo)
			TweenLite.set(barbersLoogLogo, {display:'none',   position: 'absolute', top:'77px', right: '-78px'});

			var tl = new TimelineLite({paused:true});
			tl.set(svgBody, {display:'block', scale:1});
			tl.from(svgBody, 0.7, {y: '-200%', scale:.5});
			tl.to(LookText, 0.7, {fill: 'red'});
			tl.to(BarberText, 0.7, {fill: 'white'});
			//tl.add( TweenLite.to(svgBody, 2, {rotation:"+=360"}));
			tl.addLabel("text", 1);
			//tl.set(text1, {display:'block', perspective:600},"text");
			//tl.to(text1, 0.7, {fontSize:45}, "text");
			//tl.to(text1, 0.7, {fontSize:20}, '+=0.9',"text");
			tl.set(barbersLoogLogo,{display:'block', scale:.8});
			tl.to(barbersLoogLogo,1,{scale:0.3})
			//tl.to(text1, 2, {scale:6, immediateRender:true}, "text");

			//tl.add('moveLogo','+=2');
			//tl.to(svgBody, 5,{x:'+200%'}, 'moveLogo');
			tl.play();
		});

	}
}
