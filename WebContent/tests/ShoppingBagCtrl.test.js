describe('shoppingbag-app', function() {
	
	var rootScope, scope, controller, httpBackend, _OrderService;
	
	beforeEach(module('shoppingbag-app'));
	
	beforeEach(inject(function($rootScope, $controller, $httpBackend, OrderService, ProductsFactory) {
		rootScope = $rootScope;
		scope = $rootScope.$new();
		$controller('ShoppingBagCtrl', {
			'$scope': scope,
			'OrderService' : OrderService,
			'ProductsFactory': ProductsFactory
		});
		httpBackend = $httpBackend;
		httpBackend.whenGET('shop/products').respond(200, [ {
					"id" : 1,
					"name" : "Margharita",
					"price" : 5.0
				}, {
					"id" : 2,
					"name" : "Cardinale",
					"price" : 6.5
				}]);
		_OrderService = OrderService;
	}));
	
	describe('ShoppingBagCtrl', function() {
		it('should reflect BagService changes', function() {
			
			_OrderService.bag["1"] = 3;
			_OrderService.bag["2"] = 5;
			scope.$digest();
			
			expect(scope.bag).toEqual(jasmine.objectContaining({1: 3, 2: 5}));		
		});
		
		it('should give original product when id is provided', function() {
			
			scope.all();
			httpBackend.flush();
			
			_OrderService.bag["1"] = 3;
			_OrderService.bag["2"] = 5;
			scope.$digest();
			
			expect(scope.getProductById("1")).toEqual(jasmine.objectContaining({name : 'Margharita'}));
		});
		
		it('should compute the total', function() {
			scope.all();
			httpBackend.flush();
			
			_OrderService.bag["1"] = 3;
			_OrderService.bag["2"] = 5;
			scope.$digest();
			
			expect(scope.getTotal("1")).toEqual(15.0);
			expect(scope.getTotal('2')).toEqual(32.50);
		});
		
		it('should comput the grand total price', function() {
			scope.all();
			httpBackend.flush();
			
			_OrderService.bag["1"] = 3;
			_OrderService.bag["2"] = 5;
			scope.$digest();
			
			expect(scope.getGrandTotal()).toEqual(47.50);
		});
	});
});