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