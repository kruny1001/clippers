'use strict';

angular.module('payment').controller('CustomCheckoutController', CustomCheckoutController);

	function CustomCheckoutController($scope, $http, $braintree) {
		// Custom checkout controller logic
		// ...

		var client;
		$scope.cCard = {
			number: '',
			expirationDate: ''
		};

		var startup = function() {
			$braintree.getClientToken().success(function(token) {
				client = new $braintree.api.Client({
					clientToken: token
				});
			});
		}

		$scope.cCard.number = "4111111111111111";
		$scope.cCard.expirationDate ="10/18";

		$scope.makePayment = function() {

			// - Validate $scope.creditCard
			// - Make sure client is ready to use

			client.tokenizeCard({
				number: $scope.cCard.number,
				expirationDate: $scope.cCard.expirationDate
			}, function (err, nonce) {

				console.log("err: " + err);
				console.log("nonce: "+nonce);

				$http.post('/buy-something', {nonce:nonce}).success(function(data){
					console.log(data);
					alert('1');
				})
					.error(function(){
						alert('2');
					})

			});
		};

		startup();

		//braintree.setup("CLIENT-TOKEN-FROM-SERVER", "custom", {id: "checkout"});

	}