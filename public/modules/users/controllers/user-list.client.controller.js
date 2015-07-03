'use strict';

angular.module('users').controller('UserListController',
	function($scope, UsersCustom) {
		$scope.userNumber = 0;
		$scope.users = UsersCustom.query();
		$scope.users.$promise.then(function(data){
			$scope.userNumber	= data.length;
		})
	}
);