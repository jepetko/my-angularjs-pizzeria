describe('wizard-components', function() {
	
	var rootScope, scope, compile, location;
	
	var compileTpl = function(tpl) {
		var link = compile(tpl);
		var element = link(scope);
		scope.$digest();
		return element;
	};

	beforeEach(module('gettext'));
	beforeEach(module('wizard-components'));
	beforeEach(inject(function($rootScope, $compile, $location) {
		rootScope = $rootScope;
		scope = $rootScope.$new();
		scope.getOrderCount = function() {
			return 3;
		};
		compile = $compile;
		location = $location;
	}));
	
	describe('Wizard', function() {
		
		var element = null;
		beforeEach( function() {
			element = compileTpl('<wizard c="getOrderCount()"></wizard');
		});
		
		it('should contain 5 items', function() {						
			var lis = $(element).find('li');
			expect(lis.length).toBe(5);
			
			var labels = ['Choose product', 'Your shopping bag', 'Your address', 'Finish', 'Orders (3)'];
			var i = 0;
			angular.forEach($(element).find('li'), function(el) {
				expect($(el).text()).toEqual(labels[i]);
				i++;
			});
		});
		
		it('should display the 2nd item as selected when the current URL is #!/bag', function() {
			location.path('/bag');
			rootScope.$digest();
			
			var lis = $(element).find('li');
			var second = $(lis[1]);
						
			var classes = second.attr('class').split(' ');
			expect( $.inArray('active', classes) ).toBeGreaterThan(-1);			
		});
	});
	
});