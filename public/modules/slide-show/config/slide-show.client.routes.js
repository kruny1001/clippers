'use strict';

//Setting up route
angular.module('slide-show').config(['$stateProvider','$mdIconProvider',
	function($stateProvider, $mdIconProvider) {
		// Slide show state routing
		$stateProvider.
		state('slide-show-view', {
			url: '/slide-show-view',
			templateUrl: 'modules/slide-show/views/slide-show-view.client.view.html'
		});
		$mdIconProvider.icon('barbersLook', 'modules/slide-show/img/logo/barberLogo.svg');
		$mdIconProvider.icon('barbersLookText', 'modules/slide-show/img/logo/BarberLookLogo.svg');
	}
]);