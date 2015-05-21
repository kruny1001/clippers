'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {

		var wistiaEmbed = Wistia.embed("29b0fbf547", {
			version: "v1",
			videoWidth: 640,
			videoHeight: 360,
			playerColor: "688AAD"
		});
		// insert the 'bind on play' function
		wistiaEmbed.bind('play', function() {
			// use the .time() method to jump ahead 10 seconds
			wistiaEmbed.time(10);
			return this.unbind;
		});

		$scope.play = function(){
			wistiaEmbed.time(30).play();
		};

		//$scope.play();

		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);