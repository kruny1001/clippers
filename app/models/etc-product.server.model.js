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
    price:{
        type: String,
        default: '',
        required: 'Please fill Price',
        trim: true
    },
    image:{
        type: String,
        default: '',
        required: 'Please fill Image Link',
        trim: true
    },
    brand:{
        type: Schema.ObjectId,
        ref: 'ProductBrand'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('EtcProduct', EtcProductSchema);