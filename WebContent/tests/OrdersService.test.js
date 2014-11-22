describe('OrderService', function() {
	
	var scope, httpBackend, OrdersService;
	
	beforeEach(module('orders-app'));
	beforeEach(inject(function($rootScope, $httpBackend, _OrdersService_) {
		scope = $rootScope.$new();
		httpBackend = $httpBackend;
		OrdersService = _OrdersService_;
		
		httpBackend.whenPOST('payment/orders').respond(200, 
				{
					items : [ {
						product : {
							id : 1,
							name : 'Margharita',
							price : 5.50
						},
						count : 10
					} ],
					address : {
						firstname : 'Katarina',
						surname : 'Golbang',
						street : 'Some Street',
						no : 3,
						zip : '1020',
						city : 'Vienna',
						payment : 'cash'
					}
				}			
			);		
		httpBackend.whenGET('payment/orders').respond(200, 
			[{
				items : [ {
					product : {
						id : 2,
						name : 'Margharita',
						price : 5.50
					},
					count : 10,
					date: '16.11.2014 12:25',
					total: 55.0
				} ],
				address : {
					firstname : 'Katarina',
					surname : 'Golbang',
					street : 'Some Street',
					no : 3,
					zip : '1020',
					city : 'Vienna',
					payment : 'cash'
				}
			}]				
		);				
	}));
	
	it('should be empty when no products are added', function() {
		expect(OrdersService.isBagEmpty()).toBe(true);		
	});
	
	it('should not be empty when products are added', function() {		
		OrdersService.bag["1"] = 10;		
		expect(OrdersService.isBagEmpty()).toBe(false);
	});
	
	it('should have orders when the shopping bag is sent', function() {
		OrdersService.bag["1"] = 10;
		OrdersService.sendOrder();
		
		httpBackend.flush();		
		expect(OrdersService.orders.length).toBeGreaterThan(0);
	});
});