'use strict';

angular.module('footer').directive('footerInfo', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Footer info directive logic
				// ...
				element.addClass('FI-body');
				element.append('<h2 class="md-title">Top Clippers</h2>');
				element.append('<div class="md-body-1">Best Price</div>');
				element.append('<div class="md-body-1">Best Quality</div>');
				element.append('<div class="md-body-1">Best Choice</div>');
			}
		};
	}
]);