'use strict';

angular.module('etc').controller('AdminController', ['$scope','$state',
	function($scope, $state) {
		$scope.toGo = function(name){
			$state.go(name);
		}
	}
]);