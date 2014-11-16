(function() {
	"use strict";
	
	angular.module('wizard-components',[])
	.directive('wizard', function() {
		
		var link = function(scope, el, attrs) {			
		};
		
		return {
			scope: {
				c : '&'
			},
			controller: function($scope) {
				$scope.pages = [ {
					label : 'Choose product',
					link : '#!/select'
				}, {
					label : 'Your shopping bag',
					link : '#!/bag'
				}, {
					label : 'Your address',
					link : '#!/address'
				}, {
					label : 'Finish',
					link : '#!/finish'
				}, {
					label : 'Orders',
					link : '#!/orders'
				}];
				
				$scope.isOrdersTab = function(label) {
					return label == 'Orders';
				};
			},
			restrict: 'E',	
			replace: true,
			transclude: true,				
			template: '<div class="panel panel-default"><div class="panel-body">' +
						'<ul class="nav nav-pills" role="tablist">' +
							'<li role="presentation" ng-repeat="p in pages"><a href="{{p.link}}">{{p.label}}<span ng-if="isOrdersTab(p.label)"> ({{c()}})</span></a></li>' +
						'<ul>' +
					'</div></div>'
		};
	});	
	
})();