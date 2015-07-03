'use strict';

angular.module('footer').directive('footerInfo', footerInfo);


	function footerInfo($compile){
		return {
			template: '<div></div>',
			controller: footerCtrl,
			controllerAs: 'footerCtrl',
			restrict: 'E',
			link: function postLink(scope, element, attrs, ctrl) {
				// Footer info directive logic
				// ...
				element.addClass('FI-body');
				var container= angular.element('<div layout="row" layout-sm="column" layout-align="center start"></div>');
				var firstCol = angular.element('<div layout="column" layout-margin><h2 class="md-body-2" style="font-weight: bolder;">MY ACCOUNT</h2></div>')
				var secondCol = angular.element('<div layout="column" layout-margin><h2 class="md-body-2" style="font-weight: bolder;">ABOUT BARBERS LOOK</h2></div>');
				var thirdCol = angular.element('<div layout="column" layout-margin><h2 class="md-body-2" style="font-weight: bolder;">CUSTOMER SERVICE</h2></div>');
				var fourthCol = angular.element('<div layout="column" layout-margin><h2 class="md-body-2" style="font-weight: bolder;">SALE & DEALS</h2></div>');

				console.log(ctrl.firstCol);

				angular.forEach(ctrl.firstCol, function(value, key) {
					var row = angular.element('<div class="md-body-1" style="margin-left:3px;">'+value.name+'</div>');
					firstCol.append(row);
				});

				angular.forEach(ctrl.secondCol, function(value, key) {
					var row = angular.element('<div class="md-body-1" style="margin-left:3px;" >'+value.name+'</div>');
					secondCol.append(row);
				});

				angular.forEach(ctrl.thirdCol, function(value, key) {
					var row = angular.element('<div class="md-body-1" style="margin-left:3px;" >'+value.name+'</div>');
					thirdCol.append(row);
				});

				angular.forEach(ctrl.fourthCol, function(value, key) {
					var row = angular.element('<div class="md-body-1" style="margin-left:3px;" >'+value.name+'</div>');
					fourthCol.append(row);
				});

				$compile(container)(scope);
				$compile(firstCol)(scope);
				$compile(secondCol)(scope);

				firstCol.addClass('footerCol');
				secondCol.addClass('footerCol');
				thirdCol.addClass('footerCol');
				fourthCol.addClass('footerCol');

				container.append(firstCol);
				container.append(secondCol);
				container.append(thirdCol);
				container.append(fourthCol);

				element.append(container);
			}
		};

		function footerCtrl() {
			var vm = this;
			vm.firstCol = [
				{name: 'My Information'},
				{name: 'Order History'},
				{name: 'Wish List'},
				{name: 'My point & Coupon & Credit'}];

			vm.secondCol = [
				{name: 'About Us'},
				{name: 'Barbers Reward'},
				{name: 'Site Map'}];

			vm.thirdCol = [
				{name: 'Contact Us'},
				{name: 'Track Order'},
				{name: 'Company Poilicy'},
				{name: 'Blog'}];

			vm.fourthCol = [
				{name: 'New Arrivals'},
				{name: 'Best Selling'},
				{name: 'Buy 1 Get 1 Free'},
				{name: 'Clearance'}];
		}
	}
