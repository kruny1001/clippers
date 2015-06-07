'use strict';

angular.module('payment').controller('TransactionsController', TransactionsController);
	function TransactionsController($scope, $http) {
		 $http.get('findTransactions').success(function(data){
			 $scope.transactions = data;
		});

		$scope.result = '';
		var test = function(id){
			$http.get('findTransaction/'+id).success(function(data){
				$scope.result = data;
			});
		};

		$scope.findT = function(id){
			console.log(id);
			test(id);
		}



	}
