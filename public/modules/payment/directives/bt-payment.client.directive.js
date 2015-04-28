'use strict';

angular.module('payment').directive('btPayment', [
	function() {
		return {
			templateUrl: 'modules/payment/directives/template/bt-payment.html',
			restrict: 'E',
            controller: 'BtPaymentController',
			link: function postLink(scope, element, attrs) {

			}
		};
	}
]);