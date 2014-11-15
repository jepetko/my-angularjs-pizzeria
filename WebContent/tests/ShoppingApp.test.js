describe('shopping-app', function() {
	
	var rootScope, route, location;
	
	beforeEach(module('shopping-app'));
	beforeEach(inject(function($rootScope, $route, $location) {
		rootScope = $rootScope;
		route = $route;
		location = $location;
	}));
	
	describe('shopping-app', function() {
		
		it('should render products.html when URL contains #?/select', function() {
			expect(route.routes['/select'].templateUrl).toEqual('templates/products.html');	
			expect(route.routes['/bag'].templateUrl).toEqual('templates/bag.html');	
			expect(route.routes['/address'].templateUrl).toEqual('templates/address.html');
			expect(route.routes['/finish'].templateUrl).toEqual('templates/finish.html');
			
			//otherwise:
			expect(route.routes[null].redirectTo).toEqual('templates/products.html');
			
			//otherwise
			location.path('/not/valid');
			rootScope.$digest();
			expect(location.path().substring(1)).toEqual('templates/products.html');
		});		
	});
	
});