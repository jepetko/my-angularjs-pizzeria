(function() {
	"use strict";
	
	angular.module('wizard-components',['orders-services'])
	.directive('wizard', ['$rootScope', '$location', 'OrdersService', 'StringUtils', function($rootScope, $location, OrdersService, StringUtils) {
		
		var link = function(scope, el, attrs) {

		};
		
		return {
			scope: {
				c : '&'
			},
			controller: ['$scope', function($scope) {
				$scope.pages = [ {
					label : 'Choose product',
					link : '#!/select',
					css : ''
				}, {
					label : 'Your shopping bag',
					link : '#!/bag',
					css : ''
				}, {
					label : 'Your address',
					link : '#!/address',
					css : ''
				}, {
					label : 'Finish',
					link : '#!/finish',
					css : ''
				}, {
					label : 'Orders',
					link : '#!/orders',
					css : ''
				}];
				
				$scope.isOrdersTab = function(label) {
					return label == 'Orders';
				};
				
				$rootScope.$on('$locationChangeSuccess', function(oldState, newState) {					
					var path = $location.path();
					angular.forEach($scope.pages, function(el) {
						if(path === el.link.replace(/^#!/,'')) {
							el.css = 'active';
						} else {
							el.css = '';
						}
					});
					if(StringUtils.endsWith(newState, '#!/select') || StringUtils.endsWith(newState, '#!/bag') || StringUtils.endsWith(newState, '#!/address')) {
						if(OrdersService.isCurrentOrderSent()) {
							OrdersService.resetCurrentOrder();	
						}						
					}
				});
			}],
			restrict: 'E',	
			replace: true,
			transclude: true,				
			template: '<div class="panel panel-default"><div class="panel-body">' +
						'<ul class="nav nav-pills" role="tablist">' +
							'<li role="presentation" ng-repeat="p in pages" ng-class="p.css"><a href="{{p.link}}">{{p.label | translate}}<span ng-if="isOrdersTab(p.label)"> ({{c()}})</span></a></li>' +
						'<ul>' +
					'</div></div>'
		};
	}]);	
	
})();