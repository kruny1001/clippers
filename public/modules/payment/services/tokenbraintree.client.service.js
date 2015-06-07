'use strict';

angular.module('payment').factory('TokenBraintree', ['$resource',
	function($resource) {
		// Tokenbraintree service logic
		// ...
		// Public API
		return $resource('/client-token',{},
			{ 'get':    {method:'GET'},
			'save':   {method:'POST'},
			'query':  {method:'GET', isArray:true},
			'remove': {method:'DELETE'},
			'delete': {method:'DELETE'} });
	}
]);
