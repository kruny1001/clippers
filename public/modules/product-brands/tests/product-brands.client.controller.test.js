'use strict';

(function() {
	// Product brands Controller Spec
	describe('Product brands Controller Tests', function() {
		// Initialize global variables
		var ProductBrandsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Product brands controller.
			ProductBrandsController = $controller('ProductBrandsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Product brand object fetched from XHR', inject(function(ProductBrands) {
			// Create sample Product brand using the Product brands service
			var sampleProductBrand = new ProductBrands({
				name: 'New Product brand'
			});

			// Create a sample Product brands array that includes the new Product brand
			var sampleProductBrands = [sampleProductBrand];

			// Set GET response
			$httpBackend.expectGET('product-brands').respond(sampleProductBrands);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.productBrands).toEqualData(sampleProductBrands);
		}));

		it('$scope.findOne() should create an array with one Product brand object fetched from XHR using a productBrandId URL parameter', inject(function(ProductBrands) {
			// Define a sample Product brand object
			var sampleProductBrand = new ProductBrands({
				name: 'New Product brand'
			});

			// Set the URL parameter
			$stateParams.productBrandId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/product-brands\/([0-9a-fA-F]{24})$/).respond(sampleProductBrand);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.productBrand).toEqualData(sampleProductBrand);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(ProductBrands) {
			// Create a sample Product brand object
			var sampleProductBrandPostData = new ProductBrands({
				name: 'New Product brand'
			});

			// Create a sample Product brand response
			var sampleProductBrandResponse = new ProductBrands({
				_id: '525cf20451979dea2c000001',
				name: 'New Product brand'
			});

			// Fixture mock form input values
			scope.name = 'New Product brand';

			// Set POST response
			$httpBackend.expectPOST('product-brands', sampleProductBrandPostData).respond(sampleProductBrandResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Product brand was created
			expect($location.path()).toBe('/product-brands/' + sampleProductBrandResponse._id);
		}));

		it('$scope.update() should update a valid Product brand', inject(function(ProductBrands) {
			// Define a sample Product brand put data
			var sampleProductBrandPutData = new ProductBrands({
				_id: '525cf20451979dea2c000001',
				name: 'New Product brand'
			});

			// Mock Product brand in scope
			scope.productBrand = sampleProductBrandPutData;

			// Set PUT response
			$httpBackend.expectPUT(/product-brands\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/product-brands/' + sampleProductBrandPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid productBrandId and remove the Product brand from the scope', inject(function(ProductBrands) {
			// Create new Product brand object
			var sampleProductBrand = new ProductBrands({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Product brands array and include the Product brand
			scope.productBrands = [sampleProductBrand];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/product-brands\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleProductBrand);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.productBrands.length).toBe(0);
		}));
	});
}());