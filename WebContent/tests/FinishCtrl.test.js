describe('finish-app', function() {
	
	var $scope, ctrl, $httpBackend, _BagService, _ProductsFactory;
	
	beforeEach(module('finish-app'));
	
	beforeEach(inject(function($rootScope, $controller, _$httpBackend_, BagService, ProductsFactory) {
		$scope = $rootScope.$new();
		ctrl = $controller('FinishCtrl', {
			'$scope' : $scope,
			'BagService': BagService,
			'ProductsFactory' : ProductsFactory
		});
		_BagService = BagService;
		_ProductsFactory = ProductsFactory;
		
		_$httpBackend_.whenGET('shop/products').respond(200,
 				[ {
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
			expect($scope.getMessage()).toEqual('Your bag is empty. Please add some pizzas to your bag.')
		});
		
		it('should return message to the user including the order summary', function() {
			
			$httpBackend.flush();
			_BagService.bag['1'] = 3;
			_BagService.bag['2'] = 5;
			
			expect($scope.getMessage()).toEqual('Thank you for your order. Here is the summary: 3x Margharita, 5x Cardinale.')			
		});
	});
});