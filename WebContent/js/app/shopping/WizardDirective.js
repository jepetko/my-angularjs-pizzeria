(function() {
	"use strict";
	
	angular.module('wizard-components',[])
	.directive('wizard', ['$rootScope', '$location', function($rootScope, $location) {
		
		var link = function(scope, el, attrs) {

		};
		
		return {
			scope: {
				c : '&'
			},
			controller: function($scope) {
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
				
				$rootScope.$on('$locationChangeSuccess', function(newState, oldState) {					
					var path = $location.path();
					angular.forEach($scope.pages, function(el) {
						if(path === el.link.replace(/^#!/,'')) {
							el.css = 'active';
						} else {
							el.css = '';
						}
					});
				});
			},
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