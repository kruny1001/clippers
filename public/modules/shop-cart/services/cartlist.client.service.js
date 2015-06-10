'use strict';

angular.module('shop-cart').factory('Cartlist', Cartlist);

function Cartlist(localStorageService) {

	var items = localStorageService.get('shoppingList') || [];
	var total = 0;

	return {
		addItem: function(item, exist) {
			if(item.qnt === undefined)
				item.qnt = 1;
			else
				item.qnt += 1;

			if(exist < 0)
				items.push(item);

			localStorageService.set('shoppingList', items);

		},
		getItems: function(){
			return items;
		},
		clearItem: function(){
			localStorageService.clearAll;
			return items = [];
		},
		getTotal: function(){
			console.log('total');
			total = 0;
			items.forEach(function(value){
				total += value.qnt * value.price;
			})
			return total;
		}


	};
}
