'use strict';

//Etc products service used to communicate Etc products REST endpoints
angular.module('etc-products').factory('EtcProducts', ['$resource',
	function($resource) {
		return $resource('etc-products/:etcProductId', { etcProductId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},
			list : {
				method : 'GET',

				cache : true, isArray:true
			}
		});
	}
]);