'use strict';

module.exports = function(app) {
	// Routing logic

    var paymentCtrl = require('../../app/controllers/braintree.server.controller.js');



    app.get('/client-token', paymentCtrl.token);

    app.post('/buy-something', paymentCtrl.purchase);

    app.post('/buy-web', paymentCtrl.creditCard);

    app.get('/addNewCustomer', paymentCtrl.testAddCustomer);

    app.get('/searchTransaction', paymentCtrl.findTransaction);

    app.get('/generateCustToken', paymentCtrl.generateClientToken);

    app.get('/findCustomer', paymentCtrl.findCustomer);

    app.get('/findTransactions', paymentCtrl.findTransactions);

    app.get('/findTransaction/:id', paymentCtrl.findOneTran);
};