'use strict';

angular.module('payment').controller('BtPaymentTestController', ['$scope','$http', 'clientTokenPath','TokenBraintree',
	function($scope, $http, clientTokenPath, TokenBraintree) {
		var token='';

		var token = TokenBraintree.get();
		token.$promise.then(function(data){
			console.log(data);
		})
		console.log(clientTokenPath);

		$http.get('/client-token').success(function(data){
			console.log(data);
			braintree.setup(data, "custom", {
				id:"checkout",
				hostedFields:{
					styles: {
						"input": {
							"color": "#3A3A3A",
							"transition": colorTransition,
							"-webkit-transition": colorTransition
						},
						":focus": { color: "#333333" },
						".invalid": { color: "#FF0000" }
					},
					number:{
						selector:"#number"
					},
					expirationDate:{
						selector: "#expiration-date"
					}
				}
			});
		});
		var colorTransition = 'color 100ms ease-out';

		$scope.addCustomer = function(){
			$http.get('/addNewCustomer').success(function(data){
				$scope.resultCust = data;
				console.log(data);
			});
		}

	}
]);

angular.module('payment').controller('dropinCtrl', dropinCtrl);
function dropinCtrl($http) {
	var vm = this;
	vm.title = 'dropin test';
	$http.get('/client-token').success(function (data) {
		braintree.setup(data, "dropin", {
			container: "payment-form"
		});
	});
}


	angular.module('payment').controller('checkout', checkout);

	function checkout($scope, $http) {

		var client;

		$scope.creditCard = {
			cardholderName: null,
			number: null,
			expirationMonth: null,
			expirationYear:  null,
			cvv: null
		};

		$scope.dropinOptions = {
			onPaymentMethodReceived: function (payload) {
				//e.preventDefault();
				console.log(payload); // yay
				// - Send nonce to your server (e.g. to make a transaction)
				$http.post('/buy-something', {payment_method_nonce: payload.nonce}).success(function(response){
						console.log(response);
						$scope.result = response;
				});

			}
		}
	};


