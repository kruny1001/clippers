'use strict';

angular.module('jumbo-menu').directive('jumboMenu', ['$compile',
	function($compile) {
		return {
			restrict: 'E',
			controller: jumboMenuCtrl,
			controllerAs: 'ctrl',
			link: function postLink(scope, element, attrs) {

				var jumboMenuCtrl;

				var menuContainer = angular.element('<div layout="row" layout-align="center center" layout-margin></div>')
				//var title = angular.element('<div>{{ctrl.title}}</div>');
				var menu1 = angular.element('<div>Adjustable<br>Blade Clippers</div>');
				var menu2 = angular.element('<div>Detachable<br/> Blade Clippers</div>');
				var menu3 = angular.element('<div>Cordless<br/> Trimmers</div>');
				var menu4 = angular.element('<div>Corded<br/> Trimmers</div>');

				var expandMenu1 = angular.element('<div> Expand Menu: Adjustable Blade Clippers</div>');
				var expandMenu2 = angular.element('<div> Expand Menu: Detachable Blade Clippers</div>');
				var expandMenu3 = angular.element('<div> Expand Menu: Cordless Trimmers</div>');
				var expandMenu4 = angular.element('<div> Expand Menu: Corded Trimmers</div>');

				expandMenu1.addClass('expand-menu')//.css('background-color','red');
				expandMenu2.addClass('expand-menu').css('background-color','blue');
				expandMenu3.addClass('expand-menu').css('background-color','orange');
				expandMenu4.addClass('expand-menu').css('background-color','yellow');

				menu1.bind("click",function() {
					TweenMax.set(expandMenu1, {display: 'block'});
					TweenMax.set([expandMenu2, expandMenu3, expandMenu4], {display: 'none'});
				});

				menu2.bind("mouseenter",function() {
					TweenMax.set(expandMenu2, {display: 'block'});
					TweenMax.set([expandMenu1, expandMenu3, expandMenu4], {display: 'none'});
				});
				menu3.bind("mouseenter",function() {
					TweenMax.set(expandMenu3, {display: 'block'});
					TweenMax.set([expandMenu1, expandMenu2, expandMenu4], {display: 'none'});
				});
				menu4.bind("mouseenter",function() {
					TweenMax.set(expandMenu4, {display: 'block'});
					TweenMax.set([expandMenu1, expandMenu2, expandMenu3], {display: 'none'});
				});

				element.bind("mouseleave",function() {
					TweenMax.set([expandMenu1, expandMenu2, expandMenu3, expandMenu4], {display: 'none'});
				});

				var contentContainer = angular.element('<div layout="column"></div>');
				var contentRow = angular.element('<div layout="row"></div>');
				var contentFirstCol = angular.element('<div class="first-column" flex-gt-sm="30"></div>');
				var contentSecondCol = angular.element('<div class="second-column" flex-gt-sm="70"></div>');

				var contentList1 = angular.element('<ul><li ng-repeat="menu in ctrl.menus">{{menu.name}}</li></ul>');
				var contentList2 = angular.element('<ul><li ng-repeat="item in ctrl.items">{{item.name}}</li></ul>');

				contentContainer.append(contentRow);
				contentRow.append(contentFirstCol);
				contentRow.append(contentSecondCol);


				$compile(contentList1)(scope);
				$compile(contentList2)(scope);
				contentFirstCol.append(contentList1);
				contentSecondCol.append(contentList2);
				expandMenu1.append(contentContainer);

				menu1.css('margin','0 15px 0 15px');
				menu2.css('margin','0 15px 0 15px');
				menu3.css('margin','0 15px 0 15px');
				menu4.css('margin','0 15px 0 15px');


				//menuContainer.append(title);
				menuContainer.append(menu1);
				menuContainer.append(menu2);
				menuContainer.append(menu3);
				menuContainer.append(menu4);

				element.append(expandMenu1);
				element.append(expandMenu2);
				element.append(expandMenu3);
				element.append(expandMenu4);

				element.append(menuContainer);

				console.log('Check');
				var ctrl = element.controller('jumboMenu')

				element.css('background-color', '#e5e9e8');
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
		console.log(vm.menus[index]);
	}

	vm.menus = [{name: 'Hello'}, {name: 'World'}, {name: 'Lool'}];
	vm.items = [{name: 'Hello'}, {name: 'World'}, {name: 'Lool'}];
}