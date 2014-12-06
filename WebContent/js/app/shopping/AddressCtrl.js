(function() {
	"use strict";
	
	angular.module('address-app',['orders-services'])
	.directive('validcreditcard', ['StringUtils', function(StringUtils) {
		return {
			scope: '=',
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {			
				
				var helper = {
					matches : function(viewValue) {		
						if(!viewValue) {
							return false;
						}
						return viewValue.match(/^[\d+]{4}\-[\d+]{4}\-[\d+]{4}\-[\d+]{4}$/);					
					},
					format: function(viewValue) {
						if(!viewValue) {
							return '';
						}
						var cleanViewValue = viewValue.replace(/[^0-9]+/g,'');
						var formattedValue = '';
						for(var i=1;i<=cleanViewValue.length;i++) {
							formattedValue += cleanViewValue.charAt(i-1);
							if(i%4 === 0 && i < cleanViewValue.length) {
								formattedValue += '-';
							}
						}
						return formattedValue;
					}
				};
				
				//ctrl.$validators not available for some reason...						
				ctrl.$parsers.push( (function(helper) {
					return function(viewValue) {
						if(!viewValue) {
							return '';
						}
						
						viewValue = helper.format(viewValue);
						ctrl.$viewValue = viewValue;
						ctrl.$render();
						
						var matches = helper.matches(viewValue);
						ctrl.$setValidity('creditcard', matches);
						return matches ? viewValue : '';
					};
				})(helper) );
				
				ctrl.$formatters.push( (function(helper) {
					return function(viewValue) {
						if(!viewValue) {							
							return '';
						}
						viewValue = format(viewValue);
						var matches = matches(viewValue);
						ctrl.$setValidity('creditcard', matches);
						return matches ? viewValue : '';
					}
				})(helper) );
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
		$scope.isAddressValid = function() {
			return $scope.addressForm.$valid;
		};
		
		$scope.$watch('address', function(value) {
			OrdersService.setAddressValid($scope.addressForm.$valid);	
		}, true);
	}]);		
})();