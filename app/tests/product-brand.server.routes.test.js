'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ProductBrand = mongoose.model('ProductBrand'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, productBrand;

/**
 * Product brand routes tests
 */
describe('Product brand CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Product brand
		user.save(function() {
			productBrand = {
				name: 'Product brand Name'
			};

			done();
		});
	});

	it('should be able to save Product brand instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Product brand
				agent.post('/product-brands')
					.send(productBrand)
					.expect(200)
					.end(function(productBrandSaveErr, productBrandSaveRes) {
						// Handle Product brand save error
						if (productBrandSaveErr) done(productBrandSaveErr);

						// Get a list of Product brands
						agent.get('/product-brands')
							.end(function(productBrandsGetErr, productBrandsGetRes) {
								// Handle Product brand save error
								if (productBrandsGetErr) done(productBrandsGetErr);

								// Get Product brands list
								var productBrands = productBrandsGetRes.body;

								// Set assertions
								(productBrands[0].user._id).should.equal(userId);
								(productBrands[0].name).should.match('Product brand Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Product brand instance if not logged in', function(done) {
		agent.post('/product-brands')
			.send(productBrand)
			.expect(401)
			.end(function(productBrandSaveErr, productBrandSaveRes) {
				// Call the assertion callback
				done(productBrandSaveErr);
			});
	});

	it('should not be able to save Product brand instance if no name is provided', function(done) {
		// Invalidate name field
		productBrand.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Product brand
				agent.post('/product-brands')
					.send(productBrand)
					.expect(400)
					.end(function(productBrandSaveErr, productBrandSaveRes) {
						// Set message assertion
						(productBrandSaveRes.body.message).should.match('Please fill Product brand name');
						
						// Handle Product brand save error
						done(productBrandSaveErr);
					});
			});
	});

	it('should be able to update Product brand instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Product brand
				agent.post('/product-brands')
					.send(productBrand)
					.expect(200)
					.end(function(productBrandSaveErr, productBrandSaveRes) {
						// Handle Product brand save error
						if (productBrandSaveErr) done(productBrandSaveErr);

						// Update Product brand name
						productBrand.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Product brand
						agent.put('/product-brands/' + productBrandSaveRes.body._id)
							.send(productBrand)
							.expect(200)
							.end(function(productBrandUpdateErr, productBrandUpdateRes) {
								// Handle Product brand update error
								if (productBrandUpdateErr) done(productBrandUpdateErr);

								// Set assertions
								(productBrandUpdateRes.body._id).should.equal(productBrandSaveRes.body._id);
								(productBrandUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Product brands if not signed in', function(done) {
		// Create new Product brand model instance
		var productBrandObj = new ProductBrand(productBrand);

		// Save the Product brand
		productBrandObj.save(function() {
			// Request Product brands
			request(app).get('/product-brands')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Product brand if not signed in', function(done) {
		// Create new Product brand model instance
		var productBrandObj = new ProductBrand(productBrand);

		// Save the Product brand
		productBrandObj.save(function() {
			request(app).get('/product-brands/' + productBrandObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', productBrand.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Product brand instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Product brand
				agent.post('/product-brands')
					.send(productBrand)
					.expect(200)
					.end(function(productBrandSaveErr, productBrandSaveRes) {
						// Handle Product brand save error
						if (productBrandSaveErr) done(productBrandSaveErr);

						// Delete existing Product brand
						agent.delete('/product-brands/' + productBrandSaveRes.body._id)
							.send(productBrand)
							.expect(200)
							.end(function(productBrandDeleteErr, productBrandDeleteRes) {
								// Handle Product brand error error
								if (productBrandDeleteErr) done(productBrandDeleteErr);

								// Set assertions
								(productBrandDeleteRes.body._id).should.equal(productBrandSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Product brand instance if not signed in', function(done) {
		// Set Product brand user 
		productBrand.user = user;

		// Create new Product brand model instance
		var productBrandObj = new ProductBrand(productBrand);

		// Save the Product brand
		productBrandObj.save(function() {
			// Try deleting Product brand
			request(app).delete('/product-brands/' + productBrandObj._id)
			.expect(401)
			.end(function(productBrandDeleteErr, productBrandDeleteRes) {
				// Set message assertion
				(productBrandDeleteRes.body.message).should.match('User is not logged in');

				// Handle Product brand error error
				done(productBrandDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		ProductBrand.remove().exec();
		done();
	});
});