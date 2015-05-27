'use strict';

angular.module('shop-cart').factory('Cartlist', Cartlist);

function Cartlist() {
	var items = [];
	return {
		addItem: function(item) {
			items.push(item);
		},
		getItems: function(){
			return items;
		}

	};
}
