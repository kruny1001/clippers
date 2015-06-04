'use strict';

//Setting up route
angular.module('slide-show').config(['$stateProvider',
	function($stateProvider) {
		// Slide show state routing
		$stateProvider.
		state('slide-show-view', {
			url: '/slide-show-view',
			templateUrl: 'modules/slide-show/views/slide-show-view.client.view.html'
		});
	}
]);