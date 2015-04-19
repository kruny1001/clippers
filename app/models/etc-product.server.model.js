'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Etc product Schema
 */
var EtcProductSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Etc product name',
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

mongoose.model('EtcProduct', EtcProductSchema);