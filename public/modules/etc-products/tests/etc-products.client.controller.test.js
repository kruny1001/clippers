'use strict';

(function() {
	// Etc products Controller Spec
	describe('Etc products Controller Tests', function() {
		// Initialize global variables
		var EtcProductsController,
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

			// Initialize the Etc products controller.
			EtcProductsController = $controller('EtcProductsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Etc product object fetched from XHR', inject(function(EtcProducts) {
			// Create sample Etc product using the Etc products service
			var sampleEtcProduct = new EtcProducts({
				name: 'New Etc product'
			});

			// Create a sample Etc products array that includes the new Etc product
			var sampleEtcProducts = [sampleEtcProduct];

			// Set GET response
			$httpBackend.expectGET('etc-products').respond(sampleEtcProducts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.etcProducts).toEqualData(sampleEtcProducts);
		}));

		it('$scope.findOne() should create an array with one Etc product object fetched from XHR using a etcProductId URL parameter', inject(function(EtcProducts) {
			// Define a sample Etc product object
			var sampleEtcProduct = new EtcProducts({
				name: 'New Etc product'
			});

			// Set the URL parameter
			$stateParams.etcProductId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/etc-products\/([0-9a-fA-F]{24})$/).respond(sampleEtcProduct);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.etcProduct).toEqualData(sampleEtcProduct);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(EtcProducts) {
			// Create a sample Etc product object
			var sampleEtcProductPostData = new EtcProducts({
				name: 'New Etc product'
			});

			// Create a sample Etc product response
			var sampleEtcProductResponse = new EtcProducts({
				_id: '525cf20451979dea2c000001',
				name: 'New Etc product'
			});

			// Fixture mock form input values
			scope.name = 'New Etc product';

			// Set POST response
			$httpBackend.expectPOST('etc-products', sampleEtcProductPostData).respond(sampleEtcProductResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Etc product was created
			expect($location.path()).toBe('/etc-products/' + sampleEtcProductResponse._id);
		}));

		it('$scope.update() should update a valid Etc product', inject(function(EtcProducts) {
			// Define a sample Etc product put data
			var sampleEtcProductPutData = new EtcProducts({
				_id: '525cf20451979dea2c000001',
				name: 'New Etc product'
			});

			// Mock Etc product in scope
			scope.etcProduct = sampleEtcProductPutData;

			// Set PUT response
			$httpBackend.expectPUT(/etc-products\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/etc-products/' + sampleEtcProductPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid etcProductId and remove the Etc product from the scope', inject(function(EtcProducts) {
			// Create new Etc product object
			var sampleEtcProduct = new EtcProducts({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Etc products array and include the Etc product
			scope.etcProducts = [sampleEtcProduct];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/etc-products\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEtcProduct);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.etcProducts.length).toBe(0);
		}));
	});
}());