'use strict';

//Setting up route
angular.module('etc').config(['$stateProvider',
	function($stateProvider) {
		// Etc state routing
		$stateProvider.
			state('admin', {
				url: '/admin',
				templateUrl: 'modules/etc/views/admin.client.view.html'
			})
			.state('wigs', {
				url: '/',
				templateUrl: 'modules/etc/views/wigs.client.view.html'

			})
			.state( 'etc', {
				url: '/etc',
				views: {
					"sidebar": {
						templateUrl: 'modules/etc/views/etc.client.view.html'
					},
				}
			})
			.state('report',
			{
				url:'/allPage',
				views:{
					'sidebar@':{
						template: '<h1>sideBar UI View</h1>',
					},
					'footer@':{
						template:'<div>footer UI VIEW</div>'
					},
					'detailPage@':{
						template: '<div>detail Page UI View</div>'
					}

				}
			})
	}
]);