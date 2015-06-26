'use strict';

angular.module('brand-query').factory('BrandByName', BrandByName);

function BrandByName($resource) {
	return $resource('product-by-brandId/:brandId',{ brandId:'@_id' },
		{
			get:{
				method:'GET',
				isArray: true
			}
		});
}

