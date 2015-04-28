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
    var nonce = req.body.nonce;
    console.log(nonce);
    gateway.transaction.sale({
        amount: "10.00",
        paymentMethodNonce: nonce
    }, function (err, result) {
        if (err) {
            res.send('error:', err);
        } else {
            res.send('successfully charged $10, check your sandbox dashboard!');
        }
    });
};