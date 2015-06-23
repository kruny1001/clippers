'use strict';

angular.module('reviews').directive('reviewWrite', ['$compile',
	function($compile) {
		return {
			controller: reviewWriteCtrl,
			controllerAs: 'ctrl',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				var container = angular.element('<md-content></md-content>');

				//var textField = angular.element('<textarea ng-model="htmlcontent" style="width: 100%"></textarea>');
				var angularText = angular.element('<div text-angular="text-angular" name="htmlcontent" ng-model="htmlcontent" ta-disabled="disabled"></div>')
				var btnContainer = angular.element('<div layout="row"></div>');
				var addVideo = angular.element('<md-button class="md-primary md-raised">Add Video</md-button>')
				var addPhoto = angular.element('<md-button class="md-primary md-raised">Add Image</md-button>')
				//textField.addClass('review-textarea');
				//container.append(textField);
				btnContainer.append(addVideo);
				btnContainer.append(addPhoto);
				container.append(btnContainer);

				$compile(container)(scope);
				$compile(angularText)(scope);
				element.append(angularText);
				element.append(container);
			}
		};
	}
]);

function reviewWriteCtrl($scope) {
	$scope.orightml = '<h2>Try me!</h2>'+
		'<p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p>'
		+'<p><img class="ta-insert-video" ta-insert-video="http://www.youtube.com/embed/2maA1-mvicY" src="" allowfullscreen="true" width="300" frameborder="0" height="250"/></p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li>Super Easy <b>Theming</b> Options</li><li style="color: green;">Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li class="text-danger">Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p><h4>Supports non-latin Characters</h4>';
	$scope.htmlcontent = $scope.orightml;
	$scope.disabled = false;
}