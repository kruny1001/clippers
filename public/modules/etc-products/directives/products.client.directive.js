'use strict';

angular.module('etc-products').directive('productCreate', [
	function() {
		return {
			templateUrl: 'modules/etc-products/views/create-etc-product.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);

angular.module('etc-products').directive('productList', [
    function() {
        return {
            templateUrl: 'modules/etc-products/views/list-etc-products.client.view.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

            }
        };
    }
]);