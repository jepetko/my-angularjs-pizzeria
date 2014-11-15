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
	}
	
	beforeEach(module('address-app'));
	beforeEach(inject(function(_$rootScope_, _$compile_) {
		$scope = _$rootScope_.$new();
		$compile = _$compile_;
	}));
	
	describe('validcreditcard', function() {		
		it('should be invalid if the value contains characters', function() {
			
			var tpl = '<form name="form" novalidate><input class="form-control" type="text" ng-model="address.creditcard" name="creditcard" ng-show="creditCardSelected()" validcreditcard></form>';
			var component = compileTpl(tpl);
			$scope.form.creditcard.$setViewValue("aaaaaaa");
			$scope.$digest();
			
			expect($scope.form.creditcard.$valid).toBe(false);
		});	
		
		it('should be valid if the value contains numbers only', function() {
			
			var tpl = '<form name="form" novalidate><input class="form-control" type="text" ng-model="address.creditcard" name="creditcard" ng-show="creditCardSelected()" validcreditcard></form>';			
			var component = compileTpl(tpl);
			$scope.form.creditcard.$setViewValue("111111111111");
			$scope.$digest();
			
			expect($scope.form.creditcard.$valid).toBe(true);
		});	
	});
	
});