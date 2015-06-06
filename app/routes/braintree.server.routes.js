'use strict';

module.exports = function(app) {
	// Routing logic

    var paymentCtrl = require('../../app/controllers/braintree.server.controller.js');



    app.get('/client-token', paymentCtrl.token);

    app.post('/buy-something', paymentCtrl.purchase);

    app.post('/buy-web', paymentCtrl.creditCard);

    app.get('/addNewCustomer', paymentCtrl.testAddCustomer);
};