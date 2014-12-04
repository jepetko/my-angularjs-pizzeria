(function() {
	
	"use strict";
	
	angular.module('validators',[])
	.directive('validnumber', function() {
		return {
			scope: '=',
			require: 'ngModel',
			link: function(scope, el, attrs, ngModel) {
				
				var parse = function(value) {
					if(!value) {
						return 0;
					}
					var val = value.replace(/[^0-9]*/g, '');
					if(val.length === 0) {
						return 0;
					}
					return parseInt(val, 10);
				};
							
				
				ngModel.$parsers.unshift(function(viewValue) {
					var val = parse(viewValue);
					ngModel.$setValidity('validnumber', true);
					ngModel.$viewValue = val;
					ngModel.$render();
					return val;
				});
				ngModel.$formatters.unshift(function(viewValue) {
					var val = parse(viewValue);
					ngModel.$setValidity('validnumber', true);
					return val;
				});
			}
		};
	});
	
})();