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

	/*
	 Resource
	 _id: "556e3f42d996545b4dc5a7ea"
	  brand: Object_id: "5556d123f226ecd1762f4a18"
	    name: "andis"__proto__: Objectcreated: "2015-06-02T23:41:54.999Z"
	  image: "modules/etc/img/products/1.png"
	  name: "UltraEdge BGRC™ Detachable Blade Clipper"
	  price: "185.15"
	  type: ""
	  user: Object_id: "553deb8276d1fd5e25659936"display
	    Name: "Kevin S"
	*/
	// Find existing Etc product
	$scope.findOne = function() {
		$scope.etcProduct = EtcProducts.get({
			etcProductId: $stateParams.etcProductId
		});

		$scope.etcProduct.$promise.then(function(data){
			$scope.etcProduct.desc = 'Brand New In The Box  Andis Master 01922 ML Clipper 90th Anniversary Limited Edition Unbreakable, lightweight aluminum housing for years of dependable service Powerful magnetic motor generates 14,000 cutting strokes per minute Precision built to run quiet and cool Single lever adjusts clipper blades from fine to coarse {size #000 (1/100th") to size Single lever adjusts clipper blades from fine to coarse {size #000 (1/100th") to size #1(1/8")} length cutting depths, special upper blade features fast feed action Convenient thumb controlled side switch for one-hand on/off operation Designed for heavy-duty hair cutting Perfect for all around cutting and tapering';
			$scope.etcProduct.sku = '40102019227';
			$scope.etcProduct.size = {width: 10, height: 8, depth: 5},
			$scope.etcProduct.review = {score: 10, num: 8};
			$scope.etcProduct.delivery = {price: 'Free'};
			$scope.etcProduct.extraImg =[{imageUrl:'modules/etc-products/img/blackMaster_01795_1.png'},
				{imageUrl:'modules/etc-products/img/blackMaster_01795_2.png'},
				{imageUrl:'modules/etc-products/img/blackMaster_01795_3.png'}
			]
		})


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


