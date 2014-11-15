describe("ProductsFactory", function() {
	var rootScope, scope, httpBackend, myProductsFactory;
	
	beforeEach(module("products-services"));
	
	beforeEach(inject(function($rootScope, $httpBackend, ProductsFactory) {
		rootScope = $rootScope;
		scope = $rootScope.$new();
		httpBackend = $httpBackend;
		myProductsFactory = ProductsFactory;
		
		httpBackend.whenGET('shop/products').respond(200,
 				[ {
			"id" : 1,
			"name" : "Margharita",
			"price" : 5.0
		}, {
			"id" : 2,
			"name" : "Cardinale",
			"price" : 6.5
		}, {
			"id" : 3,
			"name" : "Prosciuto",
			"price" : 8.5
		}, {
			"id" : 4,
			"name" : "Tonno",
			"price" : 7.5
		}, {
			"id" : 5,
			"name" : "Quattro Stagioni",
			"price" : 8.0
		}, {
			"id" : 6,
			"name" : "Familien-Pizza",
			"price" : 12.0
		} ]
		);
		
	}));
	
	describe("ProductsFactory", function() {
		
		it('should return 5 products', function() {
			myProductsFactory.query(function(data) {
				scope.products = data;
			});
			httpBackend.flush();
			expect(scope.products).not.toBeNull();
			expect(scope.products.length).not.toBe(0);
			expect(scope.products.length).toBe(6);
		});		

	});
});