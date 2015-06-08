'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Review Schema
 */
var ReviewSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	productId: {
		type: Schema.ObjectId,
		ref: 'EtcProduct'
	},
	title:{
		type: String,
		default: '',
		//required: 'Please fill Review Title',
	},
	rate:{
		type: Number,
		defalut: 1,
	},
	pros:{
		type: String,
		default:'',
	},
	cons:{
		type: String,
		default:'',
	},
	notes:{
		type: String,
		default:''
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Review', ReviewSchema);