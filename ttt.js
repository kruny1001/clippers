/**
 * Created by kruny1001 on 6/29/15.
 */

var testModule = (function () {

	var counter = 0;
	console.log('1');
	return {

		incrementCounter: function () {
			return counter++;
		},

		resetCounter: function () {
			console.log( "counter value prior to reset: " + counter );
			counter = 0;
		}
	};

})();

var testModule2 = function () {

	var counter = 0;
	console.log('2');
	return {

		incrementCounter: function () {
			return counter++;
		},

		resetCounter: function () {
			console.log( "counter value prior to reset: " + counter );
			counter = 0;
		}
	};

}();

