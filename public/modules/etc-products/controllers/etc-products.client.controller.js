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

function EtcProductsController($rootScope, $scope, $stateParams, $location, $mdDialog, Authentication,
                               EtcProducts, $timeout, $q, $state, ProductBrands, Cartlist) {

	$scope.thumbNail = [
		{imageUrl:'https://barber-and-beauty.andis.com/images_and_docs/63700-ultraedge-bgrc-clipper-bgrc-straight-thumb.png', actualImage:'https://barber-and-beauty.andis.com/images_and_docs/63700-ultraedge-bgrc-clipper-bgrc-straight.png'},
		{imageUrl:'https://barber-and-beauty.andis.com/images_and_docs/63700-ultraedge-bgrc-clipper-bgrc-angle-thumb.png', actualImage:'https://barber-and-beauty.andis.com/images_and_docs/63700-ultraedge-bgrc-clipper-bgrc-angle.png'},
		{imageUrl:'https://barber-and-beauty.andis.com/images_and_docs/63700-ultraedge-bgrc-clipper-bgrc-package-thumb.png', actualImage:'https://barber-and-beauty.andis.com/images_and_docs/63700-ultraedge-bgrc-clipper-bgrc-package.png'},];

	$scope.clickThumbImage = function(index){
		console.log(index);
		$scope.etcProduct.image =$scope.thumbNail[index].actualImage;
	}

	$scope.loadUsers = function() {
		// Use timeout to simulate a 650ms request.
		$scope.brands = [];
		return $timeout(function() {
			$scope.brands = ProductBrands.query();
		}, 650);
	};

	$scope.addCart = function(){
		//Cartlist.addItem($scope.etcProduct);
		$rootScope.$broadcast('cart-updated', {product: $scope.etcProduct});
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


	var imagePath = 'modules/etc/img/bunny.png';

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





	$scope.rate = 3;
	$scope.max = 5;
	$scope.isReadonly = true;

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value / $scope.max);
	};

	$scope.ratingStates = [
		{stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
		{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
		{stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
		{stateOn: 'glyphicon-heart'},
		{stateOff: 'glyphicon-off'}
	];


}


