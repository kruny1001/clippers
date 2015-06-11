'use strict';

angular.module('payment').controller('CheckoutController', CheckoutController);

function CheckoutController($scope, Cartlist) {
	var vm = this;
	vm.total = 0;

	vm.items = Cartlist.getItems();
	vm.total = Cartlist.getTotal();
}
