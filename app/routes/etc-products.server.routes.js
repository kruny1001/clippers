'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var etcProducts = require('../../app/controllers/etc-products.server.controller');



	// Etc products Routes
	app.route('/etc-products')
		.get(etcProducts.list)
		.post(users.requiresLogin, etcProducts.create);

	app.route('/etc-products/:etcProductId')
		.get(etcProducts.read)
		.put(users.requiresLogin, etcProducts.hasAuthorization, etcProducts.update)
		.delete(users.requiresLogin, etcProducts.hasAuthorization, etcProducts.delete);

	// Finish by binding the Etc product middleware
	app.param('etcProductId', etcProducts.etcProductByID);
};
