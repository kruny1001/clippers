'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Product brand Schema
 */
var ProductBrandSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Product brand name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('ProductBrand', ProductBrandSchema);