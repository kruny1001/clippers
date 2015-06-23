// Jumbo Menus

'use strict';

angular.module('jumbo-menu').directive('jumboMenu', ['$compile',
	function($compile) {
		return {
			restrict: 'E',
			controller: jumboMenuCtrl,
			controllerAs: 'ctrl',
			link: function postLink(scope, element, attrs) {

				var ctrl = element.controller('jumboMenu')
				var menuContainer = angular.element('<div layout="row" layout-align="center center" layout-margin></div>')

				//Create Menus
				angular.forEach(ctrl.menuItems, function(value, key) {
					var menu = angular.element('<div>'+value.menuName+'</div>');

					var crntExpandMenu;

					menu.css('margin','0 15px 0 15px');
					menu.bind("mouseenter",function() {
						//console.log('menu entered ' + this);
						TweenMax.set(expandsMenu, {display: 'none'}); //reset
						TweenMax.set(expandsMenu[key], {display: 'block'});
						element.append(expandsMenu[key]);

						element.bind("mouseleave",function() {
							TweenMax.set(expandsMenu, {display: 'none'});
							expandsMenu[key].detach();
						});
					});

					menuContainer.append(menu);
				});

				// Create Sub Expand Menus
				var expandsMenu = [];
				angular.forEach(ctrl.menuItems, function(value, key) {
					//columns
					var contentList1 = angular.element('<ul class="firstList"></ul>');
					var contentList2 = angular.element('<ul class="secondList" style="display: -webkit-inline-box;"></ul>');

					var expandMenu = angular.element('<div></div>');
					expandMenu.addClass('expand-menu');
					var contentContainer = angular.element('<div class="subMenuExpanded" layout="column"></div>');
					var contentRow = angular.element('<div class="subMenuExpanded" layout="row" layout-sm="column"></div>');
					var contentFirstCol = angular.element('<div class="first-column" flex-gt-sm="30"></div>');

					var contentSecondCol = angular.element('<div layout="row" hide-sm class="second-column" flex-gt-sm="70"></div>');
					var imageList = angular.element('<div layout="row"></div>');

					// Column 1 Contents
					var colContent1 = [];
					angular.forEach(value.subMenus, function(value, key){
						var col1 = angular.element('<li>'+value.name+'</li>');
						this.push(col1);
						contentList1.append(col1);
					}, colContent1);

					// Column 2 Contents
					var colContent2 = [];
					angular.forEach(value.subMenus, function(value, key){
						if(value.imageUrl){
							var col2 = angular.element('<li></li>');
							var imageContainer = angular.element('<img/>');
							imageContainer.attr("src", value.imageUrl);
							imageContainer.css('width', '100px');
							imageContainer.css('height', '100px');
							col2.append(imageContainer);
							contentList2.append(col2);
							this.push(col2);
						}
					}, colContent2);

					contentContainer.append(contentRow);
					contentRow.append(contentFirstCol);
					contentRow.append(contentSecondCol);

					contentFirstCol.append(contentList1);
					contentSecondCol.append(contentList2);
					expandMenu.append(contentContainer);
					this.push(expandMenu);
				},expandsMenu);

				$compile(menuContainer)(scope);
				element.append(menuContainer);

				element.css('background-color', '#e5e9e8');
				element.css('z-index', '99');
				element.css('border-top', '2px rgb(136, 111, 111) solid');
				element.css('border-bottom', '2px rgb(136, 111, 111) solid');
			}
		};
	}
]);

function jumboMenuCtrl() {
	var vm = this;
	vm.title = 'menu';
	vm.expanded = false;
	vm.expandMenu = function(index){
		//console.log(vm.menus[index]);
	}
	vm.menuItems = [
		{menuName: 'Clipers',
			subMenus:[
				{name:'Andis',link:'#/123', imageUrl:'https://at-home.andis.com/images_and_docs/24140-dualvolt-cord-cordless-clipper-kit-rcc-angle-390x460.png'},
				{name:'Wahl',link:'#/123', imageUrl:'https://at-home.andis.com/images_and_docs/68100-headstyler-clipper-kit-rs-1-angle-390x460.png'},
				{name:'Oster',link:'#/123', imageUrl:'https://at-home.andis.com/images_and_docs/18665-home-haircut-19-piece-kit-mc-2-straight-390x460.png'}
			]
		},
		{menuName: 'Trimmers',
			subMenus:[
				{name:'Trimmers1',link:'', imageUrl:'https://at-home.andis.com/images_and_docs/75360-easycut-20-piece-haircutting-kit-raca-angle-390x460.png'},
				{name:'Trimmers2',link:'', imageUrl:'https://at-home.andis.com/images_and_docs/18460-home-haircut-19-piece-kit-mc-2-angle-390x460.png'},
				{name:'Trimmers3',link:'', imageUrl:'https://at-home.andis.com/images_and_docs/18575-home-haircut-9-piece-kit-mc-2-straight-390x460.png'}]
		},
		{menuName: 'Accessaries',
			subMenus:[
				{name:'Accessaries1',link:'', },
				{name:'Accessaries2',link:'', },
				{name:'Accessaries1',link:'', imageUrl:'https://at-home.andis.com/images_and_docs/63765-easycut+-clipper-kit-raca-straight-390x460.png'},
				{name:'Accessaries2',link:'', imageUrl:'https://at-home.andis.com/images_and_docs/18575-home-haircut-9-piece-kit-mc-2-straight-390x460.png'},
				{name:'Accessaries3',link:'', },
				{name:'Accessaries1',link:'', imageUrl:'https://at-home.andis.com/images_and_docs/63765-easycut+-clipper-kit-raca-straight-390x460.png'},

				{name:'Accessaries3',link:'', },
				{name:'Accessaries1',link:'', imageUrl:'https://at-home.andis.com/images_and_docs/63765-easycut+-clipper-kit-raca-straight-390x460.png'},
				{name:'Accessaries2',link:'', },
				{name:'Accessaries3',link:'', imageUrl:'https://barber-and-beauty.andis.com/images_and_docs/64850-ceramic-bgr+-clipper-bgr+-straight-390x460.png'}]}
	];
}