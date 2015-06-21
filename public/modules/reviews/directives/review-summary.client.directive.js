'use strict';


angular.module('reviews').directive('reviewSummary', reviewSummary);

function reviewSummary($compile) {
	return {
		restrict: 'E',
		controller: reviewSummaryCtrl,
		controllerAs: 'reviewSumCtrl',

		link: function postLink(scope, element, attrs) {
			var container = angular.element('<md-content></md-content>');
			var recentReview;
			var NoRecentReview;
			var header = angular.element(
				'<md-fab-toolbar md-open="reviewSumCtrl.isOpen" count="reviewSumCtrl.demo.count" ng-class="reviewSumCtrl.demo.selectedAlignment">'+
					'<md-fab-trigger class="align-with-text">'+
						'<md-button aria-label="menu" class="md-fab md-primary">'+
							'<md-icon md-svg-src="modules/reviews/img/menu.svg"></md-icon>'+
						'</md-button>'+
					'</md-fab-trigger>'+
					'<md-toolbar>'+
						'<md-fab-actions class="md-toolbar-tools">'+
							'<md-button aria-label="comment" class="md-icon-button">'+
								//'<md-icon md-svg-src="modules/reviews/img/menu.svg"></md-icon>'+
								'Best'+
							'</md-button>'+
							'<md-button aria-label="label" class="md-icon-button">'+
								//'<md-icon md-svg-src="modules/reviews/img/menu.svg"></md-icon>'+
								'Worst'+
							'</md-button>'+
							'<md-button aria-label="photo" class="md-icon-button">'+
								//'<md-icon md-svg-src="modules/reviews/img/menu.svg"></md-icon>'+
								'Write'+
							'</md-button>'+
					'</md-fab-actions>'+
					'</md-toolbar>'+
				'</md-fab-toolbar>');
			$compile(header)(scope);

			element.append(header);
		}
	};
}


function reviewSummaryCtrl($scope) {
	var vm = this;
  vm.isOpen = false;
	vm.demo = {
		isOpen: false,
		count: 0,
		selectedAlignment: 'md-left'
	};
}
