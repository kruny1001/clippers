'use strict';

angular.module('review').directive('reviewWrite', [
	function() {
		return {
			controller: reviewWriteCtrl,
			controllerAs: 'ctrl',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);

function reviewWriteCtrl() {

}