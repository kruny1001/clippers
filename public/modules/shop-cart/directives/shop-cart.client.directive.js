//<md-icon md-svg-icon="modules/shop-cart/img/codepen.svg"></md-icon>
'use strict';

angular.module('shop-cart').directive('shopCart', shopCartDirective);

function shopCartDirective($compile, $state, Cartlist) {
	return {
		template: '<div layout="row" layout-align="space-between start">' +
									'<div class="md-body-2">Shopping Cart</div>'+
									'<md-button class="md-raised cart-btn-font" ng-click="close()" aria-label="Shopping Cart Close (shop-cart)">' +
										'close' +
									'</md-button>' +
							'</div>',
		controller:shopCartDirectiveCtrl,
		controllerAs:'shCtrl',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
			var cartContainer, cartTotal, content, noContent, checkOut, testAdd, clearAll, btnContainer;
			var isOpen = false;
			var shopCartCtrl;

			element.addClass('shopCartFloat');
			scope.total = 0;

			function create(){
				cartContainer = angular.element('<div class="shopCartContainer" ></div>');
				noContent = angular.element('<div ng-if="items" layout="column" class="md-body-1" layout-align="center start"><div flex>No Items</div></div>');
				content = angular.element('<div layout="row" class="md-caption" ng-repeat="item in shCtrl.items track by $index"><img class="cart-thumb-img" width="45" height="45" ng-src="{{item.image}}"><div class="item-name" flex="50">{{item.name}}</div><div flex="25" class="item-price">{{item.price | currency:"$"}}</div><div flex="10" class="item-qnt">{{item.qnt}}</div></div>');
				cartTotal = angular.element('<hr/><div layout="row" class="md-caption"><div flex="70">Total: </div><div flex="30" class="shopCartTotal" >{{shCtrl.total | currency:"USD$"}}</div></div>');
				btnContainer = angular.element('<div layout="row", layout-align="center center"></div>');
				checkOut = angular.element('<md-button class="md-raised md-warn cart-btn-font" ng-click="shCtrl.goToCheckOut()">Proceed to Checkout </md-button>');
				clearAll = angular.element('<md-button class="md-raised cart-btn-font" ng-click="shCtrl.clearAll()">Clear Add</md-button>');

				if(shopCartCtrl == undefined){
					shopCartCtrl = element.controller('shopCart');
				}

				// Content Container
				element.append(cartContainer);
				// No content tag
				cartContainer.append(noContent);
				// content tag
				cartContainer.append(content);
				// Content Total

				element.append(cartTotal);


				//Create Checkout and clear history btns
				btnContainer.append(checkOut);
				btnContainer.append(clearAll);

				element.append(btnContainer);
				$compile(btnContainer)(scope);

				//Compile tag
				$compile(noContent)(scope);
				$compile(cartTotal)(scope);
				$compile(content)(scope);

				$compile(cartContainer)(scope);



				//Broadcast listner
				scope.$on('cart-updated', function(event, args){
					scope.open();

					var targetUpdate = _.findIndex(shopCartCtrl.items, function(chr) {
						return chr._id === args.product._id;
					});

					Cartlist.addItem(args.product, targetUpdate);
					shopCartCtrl.total = Cartlist.getTotal();
				});

				scope.$on('open-cart', function(event, args){
					scope.open();
				});

			};

			// Close Shopping Cart Directive
			scope.close = function(){
				var tlClose = new TimelineMax({paused:true});
				tlClose
					.to(element, 0.4, {scale:0, alpha:0})
					.set(element, {display:'none'}, 0.4);
				tlClose.restart();
				isOpen = false;
			};

			// Open Shopping Cart Directive
			scope.open = function(){
				var tlOpen = new TimelineMax({paused:true});
				tlOpen
					.set(element, {display:'block'})
					.to(element, 0.4, {scale:1, alpha:1});
				tlOpen.restart();
				isOpen = true;
			};

			create();
		}
	};
}

function shopCartDirectiveCtrl($scope, $state, Cartlist, localStorageService){

	var shCtrl = this;
	shCtrl.total = 0;
	shCtrl.items = Cartlist.getItems();
	shCtrl.total = Cartlist.getTotal();

	shCtrl.checkOut = function(){
		console.log('checkout');
		$state.go('checkout');
	};

	shCtrl.clearAll = function(){
		localStorageService.clearAll;
		shCtrl.items = Cartlist.clearItem();
		$scope.$digest();
		console.log('cleared All items');
	};

	shCtrl.goToCheckOut = function(){
		$state.go('checkout');
	}
}
