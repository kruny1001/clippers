'use strict';

module.exports = function(app) {
	// Routing logic

    var paymentCtrl = require('../../app/controllers/braintree.server.controller.js');
    var cors = require('cors');
    var bodyParser = require('body-parser');
    var jsonParser = bodyParser.json();

    app.use(cors());


    app.get('/client-token', paymentCtrl.token);

    app.post('/buy-something', paymentCtrl.purchase);

    app.post('/buy-web', paymentCtrl.creditCard);

    app.get('/addNewCustomer', paymentCtrl.testAddCustomer);

    app.get('/searchTransaction', paymentCtrl.findTransaction);

    app.get('/generateCustToken', paymentCtrl.generateClientToken);

    app.get('/findCustomer', paymentCtrl.findCustomer);

    app.get('/findTransactions', paymentCtrl.findTransactions);

    app.get('/findTransaction/:id', paymentCtrl.findOneTran);



    /**
     * Route that returns a token to be used on the client side to tokenize payment details
     */
    app.post('/api/v1/token', paymentCtrl.apiToken);

    /**
     * Route to process a sale transaction
     */
    app.post('/api/v1/process', jsonParser, paymentCtrl.apiProcess);


};