describe('address-app directives', function() {
	
	var $scope, $compile;
	
	var compileTpl = function(tpl) {
		var link = $compile(tpl);
		
		//define model of the directive
		//which is necessary for the custom validations!!
		$scope.address = {
				creditcard: ''
		};
		
		var component = link($scope);
		$scope.$digest();
		return component;
	};
	
	beforeEach(module('address-app'));
	beforeEach(inject(function(_$rootScope_, _$compile_) {
		$scope = _$rootScope_.$new();
		$compile = _$compile_;
	}));
	
	describe('validcreditcard', function() {		
		
		var component = null;		
		beforeEach(function() {
			var tpl = '<form name="form" novalidate><input class="form-control" type="text" ng-model="address.creditcard" name="creditcard" ng-show="creditCardSelected()" validcreditcard></form>';
			component = compileTpl(tpl);
		});
		
		it('should be invalid if the value contains characters', function() {
			
			$scope.form.creditcard.$setViewValue("aaaaaaa");
			$scope.$digest();
			
			expect($scope.form.creditcard.$valid).toBe(false);
			expect($scope.address.creditcard).toBe('');
		});	
		
		it('should be valid if the value contains numbers only and the credit card has 16 signs', function() {
			
			$scope.form.creditcard.$setViewValue("1234567890123456");
			$scope.$digest();
			
			expect($scope.form.creditcard.$valid).toBe(true);
			expect($scope.address.creditcard).toBe('1234-5678-9012-3456');
		});
		
		it('should NOT be valid if the value contains numbers only and the credit card has less than 16 signs', function() {

			$scope.form.creditcard.$setViewValue("1234567890");
			$scope.$digest();
			
			expect($scope.form.creditcard.$valid).toBe(false);
			expect($scope.address.creditcard).toBe('');
		});
		
		it('should NOT be valid if the value contains numbers only and the credit card has more than 16 signs', function() {

			$scope.form.creditcard.$setViewValue("123456789099999999999");
			$scope.$digest();
			
			expect($scope.form.creditcard.$valid).toBe(false);
			expect($scope.address.creditcard).toBe('');
		});		
	});	
});