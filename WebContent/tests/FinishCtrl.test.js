describe('finish-app', function() {
	
	var $scope, ctrl, $httpBackend, _OrderService, _ProductsService;
	
	beforeEach(module('gettext'));
	beforeEach(module('finish-app'));
	
	beforeEach(inject(function($rootScope, $controller, _$httpBackend_, OrdersService, ProductsService) {
		$scope = $rootScope.$new();
		
		ctrl = $controller('FinishCtrl', {
			'$scope' : $scope,
			'OrdersService': OrdersService,
			'ProductsService' : ProductsService
		});
		_OrdersService = OrdersService;
		
		//emulate valid address and confirmation...
		_OrdersService.isAddressValid = function() {
			return true;
		};
		_OrdersService.isCurrentOrderSent = function() {
			return true;
		};		
		
		_ProductsService = ProductsService;
		
		_$httpBackend_.whenGET('payment/orders').respond(200, [ {
			"items":[{
						"product":{"id":1,"name":"Margharita","price":5.0},
						"count":5
					}],
					"address":{"firstname":"John","surname":"Fox","street":"Street","no":"1","zip":"1020","city":"Vienna","payment":"Cash","creditcard":0},
					"date":"16.11.2014,19:20","total":25.0}
		]);
		_$httpBackend_.whenGET('shop/products').respond(200, [ {
			"id" : 1,
			"name" : "Margharita",
			"price" : 5.0
		}, {
			"id" : 2,
			"name" : "Cardinale",
			"price" : 6.5
		}
		]);
		$httpBackend = _$httpBackend_;
	}));
	
	describe('FinishCtrl', function() {
		
		it('should print a hint if the bag is empty', function() {
			$httpBackend.flush();
			expect($scope.createMessage()).toEqual('Your bag is empty or the address invalid. Please add some pizzas to your bag and complete your address data.');
		});
		
		it('should return message to the user including the order summary', function() {
			
			$httpBackend.flush();
			_OrdersService.bag['1'] = 3;
			_OrdersService.bag['2'] = 5;
			
			expect($scope.createMessage()).toEqual('Thank you for your order. Here is the summary: ');
			expect($scope.createProductsSummaryMessage()).toEqual('3x Margharita, 5x Cardinale');
			
		});
	});
});