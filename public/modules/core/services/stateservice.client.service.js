'use strict';

angular.module('core').factory('stateService', stateService);

function stateService($state) {

    return {
        toGo: function(name) {
            $state.go(name);
        }
    };
}
