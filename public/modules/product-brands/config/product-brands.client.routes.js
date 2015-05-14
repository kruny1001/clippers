'use strict';

//Setting up route
angular.module('product-brands').config(['$stateProvider',
	function($stateProvider) {
		// Product brands state routing
		$stateProvider.
		state('listProductBrands', {
			url: '/product-brands',
			templateUrl: 'modules/product-brands/views/list-product-brands.client.view.html'
		}).
		state('createProductBrand', {
			url: '/product-brands/create',
			templateUrl: 'modules/product-brands/views/create-product-brand.client.view.html'
		}).
		state('viewProductBrand', {
			url: '/product-brands/:productBrandId',
			templateUrl: 'modules/product-brands/views/view-product-brand.client.view.html'
		}).
		state('editProductBrand', {
			url: '/product-brands/:productBrandId/edit',
			templateUrl: 'modules/product-brands/views/edit-product-brand.client.view.html'
		});
	}
]);