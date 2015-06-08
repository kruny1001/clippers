'use strict';

angular.module('reviews').directive('reviewList', ['$compile','Reviews',
	function($compile) {
		return {
			restrict: 'E',
			controller: reviewCtrl,
			controllerAs: 'review',
			link: function postLink(scope, element, attrs) {
				var container = angular.element('<md-content></md-content>');
				var list = angular.element('<md-list></md-list>');
				var subHeader = angular.element('<md-subheader class="md-no-sticky"></md-subheader>');
				var listItem = angular.element('<md-list-item class="md-3-line" ng-repeat="item in review.reviews"></md-list-item>');
				var image = angular.element('<img ng-src="{{item.face}}" class="md-avatar" alt="{{item.who}}">');
				var reviewContent = angular.element('<div class="md-list-item-text"></div>');
				var reviewContent_what = angular.element('<h3 class="md-title">{{item.title}}</h3>');
				var reviewContent_rate = angular.element('<rating ng-model="item.rate" max="review.max" readonly="review.isReadonly" on-hover="review.hoveringOver(value)" on-leave="review.overStar = null"></rating>');
				var reviewContent_who = angular.element('<h3>{{item.user.displayName}}</h3>');
				var reviewContent_notes = angular.element('<p>{{item.notes}}</p>');
				var reviewContent_prosConsContainer = angular.element('<div layout="column" layout-gt-sm="row" layout-align="center center" layout-align-gt-sm="space-around start" layout-margin layout-padding></div>');
				var reviewContent_pros = angular.element('<div flex-gt-sm="50" flex="100"><div class="md-body-2">Pros</div><p ng-bind="item.pros"></p></div>');
				var reviewContent_cons = angular.element('<div flex-gt-sm="50" flex="100"><div class="md-body-2">Cons</div><p ng-bind="item.cons"></p></div>');

				reviewContent_rate.css('pointer-events','none');

				container.append(list);
				list.append(subHeader);
				list.append(listItem);
				listItem.append(image);
				listItem.append(reviewContent);
				reviewContent.append(reviewContent_what);
				reviewContent.append(reviewContent_rate);
				reviewContent.append(reviewContent_who);
				reviewContent.append(reviewContent_notes);


				reviewContent_prosConsContainer.append(reviewContent_pros);
				reviewContent_prosConsContainer.append(reviewContent_cons);
				reviewContent.append(reviewContent_prosConsContainer);

				$compile(container)(scope);
				element.append(container);
			}
		};
	}
]);

function reviewCtrl(Reviews){
	console.log('Test Review Ctrl');
	var vm = this;
	vm.max = 5;
	vm.isReadonly = true;
	vm.hoveringOver = function(value) {
		vm.overStar = value;
		vm.percent = 100 * (value / vm.max);
	};
	var imagePath = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ39h-I8zmB9QVskyCaly2VpKL07s1NgkZxYn6VXQYA796U5daOQ';
	var reviewQuery = Reviews.query();
	reviewQuery.$promise.then(function(result){
		vm.reviews = result.map(function(data){
			var review = {};
			review = data;
			review.face = imagePath;
			return review;
		})
	});
}

