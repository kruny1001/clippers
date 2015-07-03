'use strict';

angular.module('slide-show').directive('slideShowAndis', [
	function() {
		return {
			templateUrl: 'modules/slide-show/img/svg/AndisGroup.svg',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				element.css('display', 'block');
				element.css('margin-left', 'auto');
				element.css('margin-right', 'auto');
			}
		};
	}
]);


angular.module('slide-show').directive('slideImgs', [
	function() {
		return {
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				var mainContainer = angular.element('<div id="slider-wrapper"></div>');
				var sliderContainer = angular.element('<div id="slider"></div>');
				var slide = angular.element('<div class="slide"></div>');
				var url = '../../modules/slide-show/img/homeLogo4.png';
				slide.css( {
					'background-image'    : 'url(' + url +')',
					'background-repeat'   : 'no-repeat',
					'background-position' : 'center center'
				});
				//<img src="modules/slide-show/img/homeLogo4.png">
				sliderContainer.append(slide);
				mainContainer.append(sliderContainer);
				element.append(mainContainer);
			}
		};
	}
]);