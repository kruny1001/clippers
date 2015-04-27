'use strict';

// Etc products controller
angular.module('etc-products').controller('EtcProductsController',
	['$scope', '$stateParams', '$location', 'Authentication', 'EtcProducts','$timeout', '$q','$state',
	function($scope, $stateParams, $location, Authentication, EtcProducts, $timeout, $q, $state) {
		$scope.authentication = Authentication;

		// Create new Etc product
		$scope.create = function() {
			// Create new Etc product object
			var etcProduct = new EtcProducts ({
				name: this.name
			});

			// Redirect after save
			etcProduct.$save(function(response) {
				$location.path('etc-products/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Etc product
		$scope.remove = function(etcProduct) {
			if ( etcProduct ) { 
				etcProduct.$remove();

				for (var i in $scope.etcProducts) {
					if ($scope.etcProducts [i] === etcProduct) {
						$scope.etcProducts.splice(i, 1);
					}
				}
			} else {
				$scope.etcProduct.$remove(function() {
					$location.path('etc-products');
				});
			}
		};

		// Update existing Etc product
		$scope.update = function() {
			var etcProduct = $scope.etcProduct;

			etcProduct.$update(function() {
				$location.path('etc-products/' + etcProduct._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Etc products
		$scope.find = function() {
			$scope.etcProducts = EtcProducts.query();
		};

		// Find existing Etc product
		$scope.findOne = function() {
			$scope.etcProduct = EtcProducts.get({ 
				etcProductId: $stateParams.etcProductId
			});
		}


		$scope.goToParent = function(){
			$state.go('wigs');
		}

		//////
		//var self = this;
		$scope.readonly = false;
		// Lists of fruit names and Vegetable objects
		$scope.fruitNames = ['Apple', 'Banana', 'Orange'];
		$scope.roFruitNames = angular.copy(self.fruitNames);
		$scope.newFruitNames = ['Red', 'Yellow', 'Green'];
		$scope.vegObjs = [
			{
				'name' : 'ModelModel1',
				'type' : 'Red'
			},
			{
				'name' : 'ModelModel2',
				'type' : 'Yellow'
			},
			{
				'name' : 'ModelModel3',
				'type' : 'Green'
			}
		];
		$scope.newVeg = function(chip) {
			return {
				name: chip,
				type: 'unknown'
			};
		};
		/////

	}
]);

