describe('shoppingbag-app', function() {
	
	var rootScope, scope, controller, httpBackend, _OrdersService;
	
	beforeEach(module('shoppingbag-app'));
	
	beforeEach(inject(function($rootScope, $controller, $httpBackend, OrdersService, ProductsService) {
		rootScope = $rootScope;
		scope = $rootScope.$new();
		$controller('ShoppingBagCtrl', {
			'$scope': scope,
			'OrdersService' : OrdersService,
			'ProductsService': ProductsService
		});
		httpBackend = $httpBackend;
		
		httpBackend.whenGET('payment/orders').respond(200, [ {
			"items":[{
						"product":{"id":1,"name":"Margharita","price":5.0},
						"count":5
					}],
					"address":{"firstname":"John","surname":"Fox","street":"Street","no":"1","zip":"1020","city":"Vienna","payment":"Cash","creditcard":0},
					"date":"16.11.2014,19:20","total":25.0}
		]);		
		httpBackend.whenGET('shop/products').respond(200, [ {
					"id" : 1,
					"name" : "Margharita",
					"price" : 5.0
				}, {
					"id" : 2,
					"name" : "Cardinale",
					"price" : 6.5
				}]);
		_OrdersService = OrdersService;
	}));
	
	describe('ShoppingBagCtrl', function() {
		
		it('should reflect BagService changes', function() {
			
			_OrdersService.bag["1"] = 3;
			_OrdersService.bag["2"] = 5;
			scope.$digest();
			
			expect(scope.bag).toEqual(jasmine.objectContaining({1: 3, 2: 5}));		
		});
		
		it('should give original product when id is provided', function() {
			httpBackend.flush();
			scope.init();

			_OrdersService.bag["1"] = 3;
			_OrdersService.bag["2"] = 5;
			scope.$digest();

			expect(scope.getProductById("1")).toEqual(jasmine.objectContaining({name : 'Margharita'}));
		});
		
		it('should compute the total', function() {
			httpBackend.flush();
			scope.init();
			
			_OrdersService.bag["1"] = 3;
			_OrdersService.bag["2"] = 5;
			scope.$digest();
			
			expect(scope.getTotal("1")).toEqual(15.0);
			expect(scope.getTotal('2')).toEqual(32.50);
		});
		
		it('should comput the grand total price', function() {
			httpBackend.flush();
			scope.init();
			
			_OrdersService.bag["1"] = 3;
			_OrdersService.bag["2"] = 5;
			scope.$digest();
			
			expect(scope.getGrandTotal()).toEqual(47.50);
		});
	});
});