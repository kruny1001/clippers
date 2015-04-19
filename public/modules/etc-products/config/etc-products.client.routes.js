'use strict';

//Setting up route
angular.module('etc-products').config(['$stateProvider',
	function($stateProvider) {
		// Etc products state routing
		$stateProvider.
		state('listEtcProducts', {
			url: '/etc-products',
			templateUrl: 'modules/etc-products/views/list-etc-products.client.view.html'
		}).
		state('createEtcProduct', {
			url: '/etc-products/create',
			templateUrl: 'modules/etc-products/views/create-etc-product.client.view.html'
		}).
		state('viewEtcProduct', {
			url: '/etc-products/:etcProductId',
			templateUrl: 'modules/etc-products/views/view-etc-product.client.view.html'
		}).
		state('editEtcProduct', {
			url: '/etc-products/:etcProductId/edit',
			templateUrl: 'modules/etc-products/views/edit-etc-product.client.view.html'
		});
	}
]);