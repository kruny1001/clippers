'use strict';

//Setting up route
angular.module('etc').config(['$stateProvider',
	function($stateProvider) {
		// Etc state routing
		$stateProvider.
		state('wigs', {
			url: '/',
			templateUrl: 'modules/etc/views/wigs.client.view.html'
		}).
		state('etc', {
			url: '/etc',
			templateUrl: 'modules/etc/views/etc.client.view.html'
		});
	}
]);