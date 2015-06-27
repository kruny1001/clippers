'use strict';

angular.module('footer').directive('footerInfo', footerInfo);


	function footerInfo($compile){
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Footer info directive logic
				// ...
				element.addClass('FI-body');
				var container= angular.element('<div layout="row" layout-sm="column"></div>');
				var firstCol = angular.element('<div layout="column"><h2 class="md-title">Barbers Look</h2><div class="md-body-1" style="margin-left:3px;">Best Price</div><div style="margin-left:3px;" class="md-body-1">Best Quality</div><div style="margin-left:3px;" class="md-body-1">Best Choice</div></div>')
				var secondCol = angular.element('<div layout="column" layout-align="end end" flex><img style="height: 55px;" src="modules/footer/img/logo2.png"></div>');

				$compile(container)(scope);
				$compile(firstCol)(scope);
				$compile(secondCol)(scope);

				container.append(firstCol);
				container.append(secondCol);

				element.append(container);
			}
		};
	}
