(function() {
	"use strict";
	
	angular.module('address-app',['ngResource', 'orders-app'])
	.directive('validcreditcard', ['StringUtils', function(StringUtils) {
		return {
			scope: '=',
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {					
				//ctrl.$validators not available for some reason...						
				ctrl.$parsers.push(function(viewValue) {
					if(!viewValue) {
						return '';
					}
					var matches = viewValue.match(/^\d+$/);
					ctrl.$setValidity('creditcard', matches);
					return matches ? viewValue : '';
				});				
				scope.$watch('address.payment', function(val) {
					if(val) {
						val = StringUtils.trim(val);
					}
					if(val === 'Cash') {
						ctrl.$setValidity('creditcard', true);
						scope.address.creditcard = '';
					} else {
						ctrl.$setValidity('creditcard', (scope.address.creditcard && scope.address.creditcard.length > 0));	
					}
				});		
			}
		};	
	}])	
	.controller('AddressCtrl', ['$scope', '$location', 'OrderService', 'StringUtils', function($scope, $location, OrderService, StringUtils) {	
		$scope.address = OrderService.address;
		$scope.payments = ['VISA', 'MasterCard', 'Diners', 'Cash'];
		$scope.creditCardSelected = function() {
			if(!$scope.address.payment) {
				return false;
			}
			var p = StringUtils.trim($scope.address.payment);
			return p != 'Cash';
		};
		$scope.submit = function() {
			OrderService.sendOrder();
			//http://stackoverflow.com/questions/14301524/in-angular-how-to-redirect-with-location-path-as-http-post-success-callback
			$location.path('/finish');
		};
	}]);		
})();