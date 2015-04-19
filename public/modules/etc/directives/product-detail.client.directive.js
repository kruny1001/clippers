'use strict';

angular.module('etc').directive('productDetail', [
	function() {
		return {
			templateUrl: 'modules/etc/directives/template/product-detail.html',
			restrict: 'E',
			controller: ProductDetailCtrl,
			controllerAs: 'vm',
			link: function postLink(scope, element, attrs) {

			}
		};

		function ProductDetailCtrl($scope) {

		};
	}
]);