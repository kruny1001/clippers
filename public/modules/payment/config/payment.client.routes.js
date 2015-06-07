'use strict';

//Setting up route
angular.module('payment').config(['$stateProvider',
	function($stateProvider) {
		// Payment state routing
		$stateProvider.
		state('transactions', {
			url: '/transactions',
			templateUrl: 'modules/payment/views/transactions.client.view.html'
		}).
		state('bt-payment-test', {
			url: '/bt-payment-test',
			templateUrl: 'modules/payment/views/bt-payment-test.client.view.html'
		});
	}
]);