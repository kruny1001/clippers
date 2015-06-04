//<md-icon md-svg-icon="modules/shop-cart/img/codepen.svg"></md-icon>

'use strict';

angular.module('shop-cart').directive('shopCart', shopCartDirective);

	function shopCartDirective($compile, Cartlist) {
		return {
			template: '<div layout="row"><div class="cart-title md-body-2" flex="70">Shopping Cart</div><div class="cart-close" flex="30"><md-button class="md-fab md-mini" ng-click="close()"><span><i class="ion-close-round"></i></span></md-button></div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				element.addClass('shopCartFloat');

				scope.total = 0;
				var cartContainer = angular.element('<div class="shopCartContainer" ></div>');
				var cartTotal = angular.element('<hr/><div layout="row" class="md-caption"><div flex="70">Total: </div><div flex="30" class="shopCartTotal" >{{total | currency:"USD$"}}</div></div>');
				var content = angular.element('<div layout="row" class="md-caption" ng-repeat="item in items track by $index"><img width="45" height="45" ng-src="{{item.image}}"><div class="item-name" flex="60">{{item.name}}</div><div flex="20" class="item-price">{{item.price | currency:"$"}}</div></div>');
				var noContent = angular.element('<div ng-if="items" layout="column" class="md-body-1" layout-align="center center"><div flex>No Items</div></div>');
				// Content Container
				element.append(cartContainer);
				// No content tag
				cartContainer.append(noContent);
				// content tag
				cartContainer.append(content);
				// Content Total
				element.append(cartTotal);

				//Compile tag
				$compile(noContent)(scope);
				$compile(cartTotal)(scope);
				$compile(content)(scope);

				//Read Existing Item
				scope.items =  Cartlist.getItems();
				scope.items.forEach(function(value){
					cartContainer.append('<div class="shopCartContent" >{{value.name}}</div>');
					$compile(cartContainer)(scope);
				});

				//Broadcast listner
				scope.$on('cart-updated', function(event, args){
					scope.open();
					console.log(scope.items);

					scope.total += parseFloat(args.product.price);

					var targetUpdate = _.findIndex(scope.items, function(chr) {
						return chr._id === args.product._id;
					});
					console.log(targetUpdate);

					if(targetUpdate < 0){
						console.log('undefined');
						Cartlist.addItem(args.product);
					}
					else {
						console.log('found: '+args.product.name);
						//scope.lot(scope.items[targetUpdate]);
					}
				});

				scope.$on('open-cart', function(event, args){
					scope.open();
				});

				scope.close = function(){
					var tlClose = new TimelineMax({paused:true});
					tlClose.to(element, 0.4, {scale:0, alpha:0})
						.set(element, {display:'none'}, 0.4);
					tlClose.restart();
				};

				scope.open = function(){
					var tlOpen = new TimelineMax({paused:true});
					tlOpen.set(element, {display:'block'})
						.to(element, 0.4, {scale:1, alpha:1});
					console.log('open');
					tlOpen.restart();
				}

			}
		};
	}
