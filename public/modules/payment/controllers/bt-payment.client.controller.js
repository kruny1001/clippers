'use strict';

angular.module('payment')
    .constant('clientTokenPath', '/client-token')
    .controller('BtPaymentController', BtPaymentController);

// directive controller
function BtPaymentController($scope, $http, $braintree) {
    $scope.title = "등록하기";
    var client;
    $scope.creditCard = {
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

    $scope.creditCard.number = "4111111111111111";
    $scope.creditCard.expirationDate ="10/18";

    $scope.payButtonClicked = function() {
        console.log("clicked");
        // - Validate $scope.creditCard
        // - Make sure client is ready to use
        client.tokenizeCard({
            number: $scope.creditCard.number,
            expirationDate: $scope.creditCard.expirationDate
        }, function (err, nonce) {
            console.log("err: " + err);
            console.log("nonce: "+nonce);

            $http.post('/buy-something', {nonce:nonce}).success(function(){
                alert('1');
            })
            .error(function(){
                alert('2');
                })


            // - Send nonce to your server (e.g. to make a transaction)
        });
    };
    startup();

}