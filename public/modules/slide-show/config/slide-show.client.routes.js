'use strict';

//Setting up route
angular.module('slide-show').config(['$stateProvider','$mdIconProvider',
	function($stateProvider, $mdIconProvider) {
		// Slide show state routing
		$stateProvider.
		state('dashboard', {
			url: '/page-ani',
				views: {
					"master":{
						templateUrl: 'modules/slide-show/views/page-ani.client.view.html'
					},
					"content@dashboard": {
						templateUrl: 'modules/slide-show/views/_content.html'
					},
					"navbar@dashboard": {
						templateUrl: 'modules/slide-show/views/navbar.html'
					}
				}

		})
			.state( 'dashboard.frodo', {
				url: '/page-ani/frodo',
				views: {
					"content@dashboard": {
						templateUrl: 'modules/slide-show/views/_contentFrodeo.html'
					}
				}
			})
			.state( 'dashboard.sam', {
				url: '/page-ani/sam',
				views: {
					"content@dashboard": {
						templateUrl: 'modules/slide-show/views/_contentSam.html'
					}
				}
			})

			.
		state('slides-ads', {
			url: '/slides-ads',
			templateUrl: 'modules/slide-show/views/slides-ads.client.view.html'
		}).
		state('animation-test', {
			url: '/animation-test',
			templateUrl: 'modules/slide-show/views/animation-test.client.view.html'
		}).
		state('slide-show-view', {
			url: '/slide-show-view',

		});
		$mdIconProvider.icon('barbersLook', 'modules/slide-show/img/logo/barberLogo.svg');
		$mdIconProvider.icon('barbersLookText', 'modules/slide-show/img/logo/BarberLookLogo.svg');
		$mdIconProvider.iconSet('communication', 'modules/slide-show/img/svg/communication-icons.svg', 24);
	}
]);