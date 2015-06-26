'use strict';

//Setting up route
angular.module('brand-query').config(['$stateProvider',
	function($stateProvider) {
		// Brand query state routing
		$stateProvider.
		state('brand-by-name-test', {
			url: '/brand-by-name-test',
			templateUrl: 'modules/brand-query/views/brand-by-name-test.client.view.html'
		});
	}
]);