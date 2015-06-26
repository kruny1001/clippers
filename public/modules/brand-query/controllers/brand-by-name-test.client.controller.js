'use strict';

angular.module('brand-query').controller('BrandByNameTestController',BrandByNameTestController );

function BrandByNameTestController($scope, BrandByName) {
	$scope.products = BrandByName.get({brandId:'5556d123f226ecd1762f4a18'});
}
