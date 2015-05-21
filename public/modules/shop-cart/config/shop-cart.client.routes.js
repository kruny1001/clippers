'use strict';

//Setting up route
angular.module('shop-cart').config(['$stateProvider',
	function($stateProvider) {
		// Shop cart state routing
		$stateProvider.
		state('cart', {
			url: '/cart',
			templateUrl: 'modules/shop-cart/views/cart.client.view.html'
		});
	}
]);