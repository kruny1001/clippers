'use strict';

angular.module('users').factory('UsersCustom', ['$resource',
	function($resource) {
		return $resource('users/getAllUsers', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);