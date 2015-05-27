'use strict';

// Etc products controller
angular.module('etc-products').controller('EtcProductsController',EtcProductsController);


function DialogController($scope, $mdDialog) {
	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.answer = function(answer) {
		$mdDialog.hide(answer);
	};
}

function EtcProductsController($scope, $stateParams, $location, $mdDialog, Authentication,
                               EtcProducts, $timeout, $q, $state, ProductBrands, Cartlist) {

	$scope.loadUsers = function() {
		// Use timeout to simulate a 650ms request.
		$scope.brands = [];
		return $timeout(function() {
			$scope.brands = ProductBrands.query();
		}, 650);
	};

	$scope.addCart = function(){
		Cartlist.addItem($scope.etcProduct);
		$state.go('cart');
	};

	$scope.authentication = Authentication;

	$scope.showDetail = function(ev) {
		$mdDialog.show({
			controller: DialogController,
			templateUrl: 'modules/etc-products/template/dialogs/showDetail.html',
			targetEvent: ev,
			clickOutsideToClose:true
		})
			.then(function(answer) {
				$scope.alert = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.alert = 'You cancelled the dialog.';
			});
	};

	// Create new Etc product
	$scope.create = function() {
		// Create new Etc product object
		var etcProduct = new EtcProducts ({
			name: this.name,
			price: this.price,
			image: this.image,
			brand: this.brand._id
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
		etcProduct.brand = $scope.etcProduct.brand._id;
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

	$scope.goToCart = function(){
		$state.go('cart');
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


	var imagePath = 'https://material.angularjs.org/img/list/60.jpeg';

	$scope.phones = [
		{ type: 'Home', number: '(555) 251-1234' },
		{ type: 'Cell', number: '(555) 786-9841' },
	];
	$scope.todos = [
		{
			face : imagePath,
			what: 'Brunch this weekend?',
			who: 'Min Li Chan',
			when: '3:08PM',
			notes: " I'll be in your neighborhood doing errands  I'll be in your neighborhood doing errands  I'll be in your neighborhood doing errands  I'll be in your neighborhood doing errands I'll be in your neighborhood doing errands  I'll be in your neighborhood doing errands  I'll be in your neighborhood doing errands  I'll be in your neighborhood doing errandsI'll be in your neighborhood doing errands  I'll be in your neighborhood doing errands  I'll be in your neighborhood doing errands  I'll be in your neighborhood doing errandsI'll be in your neighborhood doing errands  I'll be in your neighborhood doing errands  I'll be in your neighborhood doing errands  I'll be in your neighborhood doing errands"
		},
		{
			face : imagePath,
			what: 'Brunch this weekend?',
			who: 'Min Li Chan',
			when: '3:08PM',
			notes: " I'll be in your neighborhood doing errands"
		},
		{
			face : imagePath,
			what: 'Brunch this weekend?',
			who: 'Min Li Chan',
			when: '3:08PM',
			notes: " I'll be in your neighborhood doing errands"
		},
		{
			face : imagePath,
			what: 'Brunch this weekend?',
			who: 'Min Li Chan',
			when: '3:08PM',
			notes: " I'll be in your neighborhood doing errands"
		},
		{
			face : imagePath,
			what: 'Brunch this weekend?',
			who: 'Min Li Chan',
			when: '3:08PM',
			notes: " I'll be in your neighborhood doing errands"
		},
	];


}


