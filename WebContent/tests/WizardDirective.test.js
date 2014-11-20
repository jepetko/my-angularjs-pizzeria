describe('wizard-components', function() {
	
	var scope, compile;
	
	var compileTpl = function(tpl) {
		var link = compile(tpl);
		var element = link(scope);
		scope.$digest();
		return element;
	};

	beforeEach(module('gettext'));
	beforeEach(module('wizard-components'));
	beforeEach(inject(function($rootScope, $compile) {
		scope = $rootScope.$new();
		scope.getOrderCount = function() {
			return 3;
		};
		compile = $compile;
	}));
	
	describe('Wizard', function() {
		it('should contain 4 items', function() {
			
			var element = compileTpl('<wizard c="getOrderCount()"></wizard');
						
			var lis = $(element).find('li');
			expect(lis.length).toBe(5);
			
			var labels = ['Choose product', 'Your shopping bag', 'Your address', 'Finish', 'Orders (3)'];
			var i = 0;
			angular.forEach($(element).find('li'), function(el) {
				expect($(el).text()).toEqual(labels[i]);
				i++;
			});
		});
	});
	
});