'use strict';

angular.module('shop-cart').controller('ShopCartController', ShopCartController);

function ShopCartController($scope, Cartlist) {
	//Add Item

	var vm = this;
	vm.imagePath = 'https://material.angularjs.org/img/washedout.png';
	vm.itemlist = [
		{title:'item1', body:'This item is bla bla', price:30, qnt:2},
		{title:'item2', body:'This item is bla bla', price:39, qnt:1},
		{title:'item3', body:'This item is bla bla', price:299, qnt:2},
		{title:'item4', body:'This item is bla bla', price:212, qnt:3},
		{title:'item5', body:'This item is bla bla', price:99, qnt:1},
		{title:'item5', body:'This item is bla bla', price:99, qnt:1},
		{title:'item5', body:'This item is bla bla', price:99, qnt:1},
		{title:'item5', body:'This item is bla bla', price:99, qnt:1},
	];

	vm.allContacts = loadContacts();
	vm.contacts = [vm.allContacts[0]];
	vm.filterSelected = true;

	function loadContacts() {
		var contacts = [
			'Marina Augustine',
			'Oddr Sarno',
			'Nick Giannopoulos',
			'Narayana Garner',
			'Anita Gros',
			'Megan Smith',
			'Tsvetko Metzger',
			'Hector Simek',
			'Some-guy withalongalastaname'
		];
		return contacts.map(function (c, index) {
			var cParts = c.split(' ');
			var contact = {
				name: c,
				email: cParts[0][0].toLowerCase() + '.' + cParts[1].toLowerCase() + '@example.com',
				image: 'http://lorempixel.com/50/50/people?' + index
			};
			contact._lowername = contact.name.toLowerCase();
			return contact;
		});
	}
}