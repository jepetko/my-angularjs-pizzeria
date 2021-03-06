describe("products-ctrl", function() {
		
	var rootScope, scope, controller, httpBackend, filter, _OrdersService;
		
	beforeEach(module('products-app'));
	
	beforeEach(inject(function($rootScope, $controller, $httpBackend, $filter, ProductsService, OrdersService) {
		rootScope = $rootScope;
		scope = $rootScope.$new();
		controller = $controller('ProductsCtrl', {
			'$scope': scope,
			'ProductsService': ProductsService,
			'OrdersService': OrdersService
		});
		httpBackend = $httpBackend;
		filter = $filter;
		_OrdersService = OrdersService;
		
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
	
	describe('ProductCtrl', function() {
		
		it('should be able to return all products', function() {
			httpBackend.flush();
			expect(scope.products.length).toBe(6);			
		});
		
		it('should remove spaces', function() {
			var filtered = filter('nospaces')('Quattro Stagioni');
			expect(filtered).toEqual('QuattroStagioni');
		});
		
		it('should add product to the bag', function() {			
			httpBackend.flush();
			
			scope.bag["1"] = 7;
			scope.$digest();
			
			expect(_OrdersService.getBag()).toEqual( jasmine.objectContaining({ 1: 7}) );
		});
	});	
});
