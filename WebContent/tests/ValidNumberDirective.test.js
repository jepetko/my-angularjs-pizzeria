describe('validators', function() {
	
	"use strict";
	
	var scope;
	
	beforeEach(module('validators'));
	beforeEach(inject(function($rootScope, $compile) {
		scope = $rootScope.$new();		
	}));

	describe('validnumber', function() {
		
		var tpl = '<form name="form"><input type="number" name="numericval" ng-model="data.numericval" data-validnumber></form>';
		var element;
		
		beforeEach(inject(function($compile) {
			
			scope.data = { numericval : '' };
			
			var link = $compile(tpl);
			element = link(scope);
			scope.$digest();
		}));
		
		it('should filter non numeric values', function() {
			scope.form.numericval.$setViewValue('aabb123');
			scope.$digest();
			expect(scope.data.numericval).toBe(123);		
		});
		
		it('should accept numeric values', function() {
			scope.form.numericval.$setViewValue('123');
			scope.$digest();
			expect(scope.data.numericval).toBe(123);
		});	
	});	
	
});