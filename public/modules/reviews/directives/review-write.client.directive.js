'use strict';

angular.module('reviews').directive('reviewWrite', ['$compile',
	function($compile) {
		return {
			controller: reviewWriteCtrl,
			controllerAs: 'ctrl',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				var container = angular.element('<md-content></md-content>');

				var textField = angular.element('<textarea></textarea>');
				var btnContainer = angular.element('<div layout="row"></div>');
				var addVideo = angular.element('<md-button class="md-primary md-raised">Add Video</md-button>')
				var addPhoto = angular.element('<md-button class="md-primary md-raised">Add Image</md-button>')
				textField.addClass('review-textarea');
				container.append(textField);
				btnContainer.append(addVideo);
				btnContainer.append(addPhoto);
				container.append(btnContainer);

				$compile(container)(scope);
				element.append(container);
			}
		};
	}
]);

function reviewWriteCtrl() {

}