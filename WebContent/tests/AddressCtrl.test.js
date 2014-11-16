describe('address-app', function() {
	
	var rootScope, scope, httpBackend, element, location, httpBackend;
	var MyOrderService;
		
	beforeEach(module('address-app'));	
	beforeEach(module('templates/address.html'));
	
	beforeEach(inject(function($rootScope, $controller, $compile, $templateCache, $location, $httpBackend, OrderService) {
		var template = $templateCache.get('templates/address.html');
		var link = $compile(template);
		element = link($rootScope.$new());
		scope = angular.element(element).scope();
		location = $location;
		MyOrderService = OrderService;
		
		httpBackend = $httpBackend;
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
					payment : 'Cash'
				}
			}			
		);		
		httpBackend.whenGET('payment/orders').respond(200, 
			[{
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
					payment : 'Cash'
				}
			}]				
		);		
	}));
	
	describe('AddressCtrl', function() {		
		it('should be not dirty at the beginning', function() {					
			expect(scope.addressForm).toBeDefined();
			expect(scope.addressForm.$dirty).toBe(false);
		});
		
		it('should be dirty after the input value has been changed', function() {
			scope.addressForm.surname.$setViewValue('Golbang');
			scope.$digest();			
			expect(scope.addressForm.$dirty).toBe(true);			
		});
		
		it('should be invalid when the values are not complete', function() {
			scope.addressForm.surname.$setViewValue('Golbang');
			scope.$digest();			
			expect(scope.addressForm.$invalid).toBe(true);		
			
			var btnSubmit = $(element).find('button');
			expect(btnSubmit.attr('disabled')).toBe('disabled');
		});
		
		it('should be valid when the values are complete and we pay in cash', function() {
			var address = {firstname : 'Katarina', surname: 'Golbang', street: 'Some Street', no: 3, zip: '1020', city: 'Vienna', payment: 'Cash'};
			angular.forEach(address, function(val,key) {
				scope.addressForm[key].$setViewValue(val);
			});
			scope.$digest();	
			expect(scope.addressForm.$invalid).toBe(false);	
			
			var btnSubmit = $(element).find('button');
			expect(btnSubmit.attr('disabled')).toBeUndefined();
		});
		
		it('should show validity hint when value is inserted', function() {
			scope.addressForm.firstname.$setViewValue('Katarina');
			scope.$digest();
			var hint = $(element).find('span').first();
			expect(hint.css('display')).not.toBe('none');
		});
		
		it('should send the order to the server', function() {
			var address = {firstname : 'Katarina', surname: 'Golbang', street: 'Some Street', no: 3, zip: '1020', city: 'Vienna', payment: 'Cash'};
			angular.forEach(address, function(val,key) {
				scope.addressForm[key].$setViewValue(val);
			});
			scope.$digest();
			
			//add a product to the bag:
			var bag = MyOrderService.getBag();
			bag['1'] = 10;
			
			//submit the form and flush the server requests
			scope.submit();
			httpBackend.flush();
			
			//get all orders again
			var orders = MyOrderService.getPendingOrders();
			httpBackend.flush();
			
			//does the order fit the expectations?
			var order = orders[0];
			expect(order.items.length).toBe(1);
						
			expect(order.address).toEqual(jasmine.objectContaining( address ));
			
			var item = order.items[0];
			expect(item.product).toEqual(jasmine.objectContaining( { name: 'Margharita', price: 5.50 } ));
			expect(item.count).toBe(10);			
		});
		
		it('should route to the last tab when form is submitted', function() {
			var address = {firstname : 'Katarina', surname: 'Golbang', street: 'Some Street', no: 3, zip: '1020', city: 'Vienna', payment: 'Cash'};
			angular.forEach(address, function(val,key) {
				scope.addressForm[key].$setViewValue(val);
			});
			scope.$digest();	
			expect(scope.addressForm.$invalid).toBe(false);	
			
			scope.submit();
			expect(location.path().substring(1)).toEqual('finish');
		});
	});	
});