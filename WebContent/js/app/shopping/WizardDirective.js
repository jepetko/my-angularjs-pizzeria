(function() {
	"use strict";
	
	angular.module('wizard-components',[])
	.directive('wizard', function() {
		
		var link = function(scope, el, attrs) {			
		};
		
		return {
			scope: {

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
				} ];
			},
			restrict: 'E',			
			template: '<div class="panel panel-default"><div class="panel-body">' +
						'<ul class="nav nav-pills" role="tablist">' +
							'<li role="presentation" ng-repeat="p in pages"><a href="{{p.link}}">{{p.label}}</a></li>' +
						'<ul>' +
					'</div></div>'
		};
	});	
	
})();