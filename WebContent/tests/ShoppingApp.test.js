describe('shopping-app', function() {
	
	var rootScope, route, location, httpBackend;
	
	beforeEach(module('gettext'));
	beforeEach(module('shopping-app'));
	beforeEach(inject(function($rootScope, $route, $location, $httpBackend) {
		rootScope = $rootScope;
		route = $route;
		location = $location;
		httpBackend = $httpBackend;
	}));
	
	describe('shopping-app', function() {
		
		it('should render products.html when URL contains #?/select', function() {
			expect(route.routes['/select'].templateUrl).toEqual('templates/products.html');	
			expect(route.routes['/bag'].templateUrl).toEqual('templates/bag.html');	
			expect(route.routes['/address'].templateUrl).toEqual('templates/address.html');
			expect(route.routes['/finish'].templateUrl).toEqual('templates/finish.html');
			expect(route.routes['/orders'].templateUrl).toEqual('templates/orders.html');
			
			//otherwise:			
			expect(route.routes[null].redirectTo).toEqual('/select');
			
			//otherwise 2: real routing
			httpBackend.expectGET('templates/products.html').respond(200);
			
			location.path('/not/valid');
			rootScope.$digest();
			expect(location.path()).toEqual('/select');
		});		
	});
	
});