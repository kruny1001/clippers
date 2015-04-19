'use strict';

angular.module('etc').controller('WigsController', ['$scope',
	function($scope) {
        $scope.degree = 0;
        $scope.flipCard = function(targetId){
            var target = $('#'+targetId);
            $scope.degree += 180;
            TweenMax.to(target, 0.4 , {rotationY: $scope.degree});
            console.log($scope.degree);
        }
		// Wigs controller logic
		// ...
	}
]);