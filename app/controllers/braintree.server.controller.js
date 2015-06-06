'use strict';

/**
 * Module dependencies.
 */
var braintree = require('braintree');
var mongoose = require('mongoose'),
    _ = require('lodash');


var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "m6zmtt6gjm242fnq",
    publicKey: "qnpq64wdsww4hwth",
    privateKey: "938bf672f651f09ffde2ead95be88bec"
});

exports.token = function(req, res) {
    gateway.clientToken.generate({}, function (err, response) {
        var clientToken = response.clientToken
        res.send(clientToken);
    });
};

exports.purchase = function(req, res) {
    var nonce = req.body.payment_method_nonce;
    console.log(req);
    //nonce = 'fake-google-wallet-nonce'
    gateway.transaction.sale({
        amount: "10.00",
        paymentMethodNonce: nonce
    }, function (err, result) {
        if (err) {
            res.send('error:', err);
        } else {
            if(result.success)
                res.json(result);
            else{
                res.json(result.message);
            }

        }
    });
};

exports.creditCard = function(req, res){

}

exports.testAddCustomer = function(req, res){
    gateway.customer.create({
        firstName: "Jen",
        lastName: "Smith",
        company: "Braintree",
        email: "jen@example.com",
        phone: "312.555.1234",
        fax: "614.555.5678",
        website: "www.example.com"
    }, function (err, result) {
        result.success;
        // true
        if(err !=="")
            res.send('result:', result);

        result.customer.id;
        // e.g. 494019
    });
}