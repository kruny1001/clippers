'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	EtcProduct = mongoose.model('EtcProduct'),
	_ = require('lodash');

/**
 * Create a Etc product
 */
exports.create = function(req, res) {
	var etcProduct = new EtcProduct(req.body);
	etcProduct.user = req.user;

	etcProduct.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(etcProduct);
		}
	});
};

/**
 * Show the current Etc product
 */
exports.read = function(req, res) {
	res.jsonp(req.etcProduct);
};

/**
 * Update a Etc product
 */
exports.update = function(req, res) {
	var etcProduct = req.etcProduct ;

	etcProduct = _.extend(etcProduct , req.body);

	etcProduct.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(etcProduct);
		}
	});
};

/**
 * Delete an Etc product
 */
exports.delete = function(req, res) {
	var etcProduct = req.etcProduct ;

	etcProduct.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(etcProduct);
		}
	});
};

/**
 * List of Etc products
 */
exports.list = function(req, res) { 
	EtcProduct.find().sort('-created').populate('user', 'displayName').exec(function(err, etcProducts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(etcProducts);
		}
	});
};

/**
 * Etc product middleware
 */
exports.etcProductByID = function(req, res, next, id) { 
	EtcProduct.findById(id).populate('user', 'displayName').exec(function(err, etcProduct) {
		if (err) return next(err);
		if (! etcProduct) return next(new Error('Failed to load Etc product ' + id));
		req.etcProduct = etcProduct ;
		next();
	});
};

/**
 * Etc product authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.etcProduct.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
