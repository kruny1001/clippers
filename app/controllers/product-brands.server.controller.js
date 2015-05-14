'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	ProductBrand = mongoose.model('ProductBrand'),
	_ = require('lodash');

/**
 * Create a Product brand
 */
exports.create = function(req, res) {
	var productBrand = new ProductBrand(req.body);
	productBrand.user = req.user;

	productBrand.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productBrand);
		}
	});
};

/**
 * Show the current Product brand
 */
exports.read = function(req, res) {
	res.jsonp(req.productBrand);
};

/**
 * Update a Product brand
 */
exports.update = function(req, res) {
	var productBrand = req.productBrand ;

	productBrand = _.extend(productBrand , req.body);

	productBrand.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productBrand);
		}
	});
};

/**
 * Delete an Product brand
 */
exports.delete = function(req, res) {
	var productBrand = req.productBrand ;

	productBrand.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productBrand);
		}
	});
};

/**
 * List of Product brands
 */
exports.list = function(req, res) { 
	ProductBrand.find().sort('-created').populate('user', 'displayName').exec(function(err, productBrands) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productBrands);
		}
	});
};

/**
 * Product brand middleware
 */
exports.productBrandByID = function(req, res, next, id) { 
	ProductBrand.findById(id).populate('user', 'displayName').exec(function(err, productBrand) {
		if (err) return next(err);
		if (! productBrand) return next(new Error('Failed to load Product brand ' + id));
		req.productBrand = productBrand ;
		next();
	});
};

/**
 * Product brand authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.productBrand.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
