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
    console.log(req.body);
    console.log(nonce);
    //nonce = 'fake-google-wallet-nonce'
    gateway.transaction.sale({
        amount: "10.00",
        customFields:{topcliper:'123'},
        paymentMethodNonce: nonce,
        billing: {
            firstName: "Paul",
            lastName: "Smith",
            company: "Braintree",
            streetAddress: "1 E Main St",
            extendedAddress: "Suite 403",
            locality: "Chicago",
            region: "IL",
            postalCode: "60622",
            countryCodeAlpha2: "US"
        },
        shipping: {
            firstName: "Jen",
            lastName: "Smith",
            company: "Braintree",
            streetAddress: "1 E 1st St",
            extendedAddress: "5th Floor",
            locality: "Bartlett",
            region: "IL",
            postalCode: "60103",
            countryCodeAlpha2: "US"
        },
    }, function (err, result) {
        if (err) {
            res.status(err).json(result);
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

exports.generateClientToken = function(req, res){
    gateway.clientToken.generate({customerId: '78157541'}, function (err, response) {
        var clientToken = response.clientToken;
        res.send(clientToken);
    });
}

exports.findTransaction = function(req, res){
    gateway.transaction.find("h6w984", function (err, transaction) {
        //transaction.escrowStatus
        res.send(transaction);
    });
}

exports.findCustomer = function(req, res){
    var completeData = {result:[]};
    var stream = gateway.customer.search(function (search) {
        search.company().is("Braintree");
    });
    stream.on("data", function (customer) {
        completeData.result.push(customer);
        //console.log(customer);
    });
    stream.on("end", function(){
        //console.log(completeData);
        res.send(completeData);
    })
}

exports.findTransactions = function(req, res){
    var completeData = [];
    var stream = gateway.transaction.search(function (search) {
        search.amount().between("1.00", "200.00");
    });

    //var today = new Date();
    //var stream = gateway.transaction.search(function (search) {
    //    search.settledAt().min(today.getDate() - 2);
    //});

    stream.on("data", function (customer) {
        //console.log(customer);
        var partial = {
            id: customer.id,
            status: customer.status,
            amount: customer.amount,
            customer: customer.customer,
        }

        completeData.push(partial);
        //console.log(customer);
    });
    stream.on("end", function(){
        //console.log(completeData.length);
        res.send(completeData);
    })
}


exports.findOneTran =function(req, res){
    var completeData = [];

    //console.log(req.params.id);

    var stream = gateway.transaction.search(function (search) {
        search.id().is(req.params.id);
    });

    stream.on("data", function (customer) {
        completeData.push(customer);
    });

    stream.on("end", function(){
        //console.log(completeData.length);
        res.send(completeData);
    });
}