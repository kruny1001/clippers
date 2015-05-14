'use strict';

angular.module('product-brands').directive('brandCreate', [
	function() {
		return {
			templateUrl: 'modules/product-brands/directives/template/brand-create.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);

angular.module('product-brands').directive('brandList', [
    function() {
        return {
            templateUrl: 'modules/product-brands/views/list-product-brands.client.view.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

            }
        };
    }
]);