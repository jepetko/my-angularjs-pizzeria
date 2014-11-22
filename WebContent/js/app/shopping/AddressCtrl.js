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
					var matches = viewValue.match(/^\d+$/) && viewValue.length === 16;
					ctrl.$setValidity('creditcard', matches);
					return matches ? viewValue : '';
				});				
				scope.$watch('address.payment', function(val) {
					if(val) {
						val = StringUtils.trim(val);
					}
					if(val === 'cash') {
						ctrl.$setValidity('creditcard', true);
						scope.address.creditcard = '';
					} else {
						ctrl.$setValidity('creditcard', (scope.address.creditcard && scope.address.creditcard.length === 16));	
					}
				});		
			}
		};	
	}])	
	.controller('AddressCtrl', ['$scope', '$location', 'OrdersService', 'StringUtils', function($scope, $location, OrdersService, StringUtils) {	
		$scope.address = OrdersService.address;
		$scope.payments = {'visa':'VISA', 'mastercard': 'MasterCard', 'diners': 'Diners', 'cash': 'Cash'};
		$scope.creditCardSelected = function() {
			if(!$scope.address.payment) {
				return false;
			}
			var p = StringUtils.trim($scope.address.payment);
			return p != 'cash';
		};
		$scope.isBagEmpty = function() {
			return $.isEmptyObject(OrdersService.bag);
		};
		$scope.btnDisabled = function() {
			return $scope.addressForm.$invalid || $scope.isBagEmpty();
		};
		$scope.submit = function() {
			OrdersService.sendOrder();
			//http://stackoverflow.com/questions/14301524/in-angular-how-to-redirect-with-location-path-as-http-post-success-callback
			$location.path('/finish');
		};
	}]);		
})();