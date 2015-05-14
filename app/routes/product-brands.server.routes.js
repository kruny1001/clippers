'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var productBrands = require('../../app/controllers/product-brands.server.controller');

	// Product brands Routes
	app.route('/product-brands')
		.get(productBrands.list)
		.post(users.requiresLogin, productBrands.create);

	app.route('/product-brands/:productBrandId')
		.get(productBrands.read)
		.put(users.requiresLogin, productBrands.hasAuthorization, productBrands.update)
		.delete(users.requiresLogin, productBrands.hasAuthorization, productBrands.delete);

	// Finish by binding the Product brand middleware
	app.param('productBrandId', productBrands.productBrandByID);
};
