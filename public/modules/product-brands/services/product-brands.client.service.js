'use strict';

//Product brands service used to communicate Product brands REST endpoints
angular.module('product-brands').factory('ProductBrands', ['$resource',
	function($resource) {
		return $resource('product-brands/:productBrandId', { productBrandId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);