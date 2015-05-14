'use strict';

// Product brands controller
angular.module('product-brands').controller('ProductBrandsController', ['$scope', '$stateParams', '$location', 'Authentication', 'ProductBrands',
	function($scope, $stateParams, $location, Authentication, ProductBrands) {
		$scope.authentication = Authentication;

		// Create new Product brand
		$scope.create = function() {
			// Create new Product brand object
			var productBrand = new ProductBrands ({
				name: this.name
			});

			// Redirect after save
			productBrand.$save(function(response) {
				$location.path('product-brands/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Product brand
		$scope.remove = function(productBrand) {
			if ( productBrand ) { 
				productBrand.$remove();

				for (var i in $scope.productBrands) {
					if ($scope.productBrands [i] === productBrand) {
						$scope.productBrands.splice(i, 1);
					}
				}
			} else {
				$scope.productBrand.$remove(function() {
					$location.path('product-brands');
				});
			}
		};

		// Update existing Product brand
		$scope.update = function() {
			var productBrand = $scope.productBrand;

			productBrand.$update(function() {
				$location.path('product-brands/' + productBrand._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Product brands
		$scope.find = function() {
			$scope.productBrands = ProductBrands.query();
		};

		// Find existing Product brand
		$scope.findOne = function() {
			$scope.productBrand = ProductBrands.get({ 
				productBrandId: $stateParams.productBrandId
			});
		};
	}
]);