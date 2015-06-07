'use strict';

angular.module('review').directive('reviewList', ['$compile',
	function($compile) {
		return {
			restrict: 'E',
			controller: reviewCtrl,
			controllerAs: 'ctrl',
			link: function postLink(scope, element, attrs) {
				var container = angular.element('<md-content></md-content>');
				var list = angular.element('<md-list></md-list>');
				var subHeader = angular.element('<md-subheader class="md-no-sticky"></md-subheader>');
				var listItem = angular.element('<md-list-item class="md-3-line" ng-repeat="item in ctrl.reviews"></md-list-item>');
				var image = angular.element('<img ng-src="{{item.face}}" class="md-avatar" alt="{{item.who}}">');
				var reviewContent = angular.element('<div class="md-list-item-text"></div>');
				var reviewContent_rate = angular.element('<rating ng-model="item.rate" max="ctrl.max" readonly="ctrl.isReadonly" on-hover="ctrl.hoveringOver(value)" on-leave="ctrl.overStar = null"></rating>');
				var reviewContent_who = angular.element('<h3>{{item.who}}</h3>');
				var reviewContent_what = angular.element('<h4>{{item.what}}</h4>');
				var reviewContent_notes = angular.element('<p>{{item.notes}}</p>');

				reviewContent_rate.css('pointer-events','none');

				container.append(list);
				list.append(subHeader);
				list.append(listItem);
				listItem.append(image);
				listItem.append(reviewContent);
				reviewContent.append(reviewContent_rate);
				reviewContent.append(reviewContent_who);
				reviewContent.append(reviewContent_what);
				reviewContent.append(reviewContent_notes);

				$compile(container)(scope);
				element.append(container);
			}
		};
	}
]);

function reviewCtrl(){
	var vm = this;
	vm.max = 5;
	vm.isReadonly = true;
	vm.hoveringOver = function(value) {
		vm.overStar = value;
		vm.percent = 100 * (value / vm.max);
	};
	var imagePath = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ39h-I8zmB9QVskyCaly2VpKL07s1NgkZxYn6VXQYA796U5daOQ';
	vm.reviews = [{
		face : imagePath,
		what: 'Awesome!',
		who: 'W. Candy',
		when: '3:08PM',
		rate: 4,
		notes: " Product is Awesome! Delivery Awesome! Queality fabulaous!"
	},
		{
			face : imagePath,
			what: 'Brunch this weekend?',
			who: 'W. Candy',
			when: '3:08PM',
			rate: 5,
			notes: " I'll be in your neighborhood doing errands"
		}];

}

