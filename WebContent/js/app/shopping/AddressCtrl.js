(function() {
	"use strict";
	
	angular.module('address-app',[])
	.directive('validcreditcard', function() {
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
						val = val.replace(/^\s+/g,'').replace(/\s+$/,'');
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
	})
	.controller('AddressCtrl', ['$scope', '$location', function($scope, $location) {		
		$scope.address = {};
		$scope.payments = ['VISA', 'MasterCard', 'Diners', 'Cash'];
		$scope.creditCardSelected = function() {
			if(!$scope.address.payment) {
				return false;
			}
			var p = $scope.address.payment.replace(/^\s+/g,'').replace(/\s+$/,'');
			return p != 'Cash';
		};
		$scope.submit = function() {
			//todo: send to the server
			//http://stackoverflow.com/questions/14301524/in-angular-how-to-redirect-with-location-path-as-http-post-success-callback
			$location.path('/finish');
		};
	}]);		
})();