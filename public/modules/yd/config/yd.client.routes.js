'use strict';

//Setting up route
angular.module('yd').config(['$stateProvider',
	function($stateProvider) {
		// Yd state routing
		$stateProvider.
		state('yd', {
			url: '/yd',
			templateUrl: 'modules/yd/views/yd.client.view.html'
		});
	}
]);