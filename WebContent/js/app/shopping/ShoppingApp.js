(function() {
	"use strict";

	angular.module('shopping-app', ['ngRoute', 'wizard-components', 'products-services', 
	                                'products-ctrl', 'shoppingbag-app', 'address-app', 'finish-app'])
	.config(['$routeProvider', '$locationProvider', '$logProvider', function($routeProvider, $locationProvider, $logProvider) {
		
		//ISSUE: missing hash prefix solved (occurs when the user changes the URL in der address bar manually)
		var arr = $logProvider.$get;
		if(arr && arr.length && arr.length > 1 && (typeof arr[1] === 'function')) {
			var logObj = arr[1];
			var o = logObj(window);
			var origError = o.error;
			o.error = function() {
				if(arguments.length > 0 && arguments[0].message) {
					var regExp = new RegExp('missing hash prefix', 'g');
					if( regExp.test('' + arguments[0].message) ) {
						var args = [].concat(arguments).slice(1);
						args.unshift('MISSING HASH PREFIX ISSUE: ' + arguments[0].message);
						o.log.apply(o, args);
					} else {
						origError.apply(o, arguments);
					}
				}
			};			
			
			$logProvider.$get = ['$window', (function(arg) {
				return function() {
					return arg;
				};
			})(o)];
		}
		
		$routeProvider
		.when('/select', {templateUrl: 'templates/products.html'})
		.when('/bag', {templateUrl: 'templates/bag.html'})
		.when('/address', {templateUrl: 'templates/address.html'})
		.when('/finish', {templateUrl: 'templates/finish.html'})
		.when('/orders', {templateUrl: 'templates/orders.html'})
		.otherwise({redirectTo: '/select'});
		
		$locationProvider.hashPrefix('!');
	}])
	.run(['gettextCatalog', '$http', function(gettextCatalog, $http) {
		gettextCatalog.setCurrentLanguage('en');
	    gettextCatalog.debug = true;	
	}])
	.controller('AppCtrl', ['$scope', 'OrderService', 'gettextCatalog', 'cookieHandler', '$http', function($scope, OrderService, gettextCatalog, cookieHandler, $http) {		
		$scope.getOrderCount = function() {
			return OrderService.orders.length;
		};
		$scope.changeLanguage = function(lng) {
			gettextCatalog.setCurrentLanguage(lng);
		};
		$scope.setUserCredentials = function(login,sessId) {
			if(cookieHandler.get('login')) {
				$scope.currentUser = cookieHandler.get('login');
			} else {
				$scope.currentUser = login;
				$scope.sessionId = sessId;
				
				$http.defaults.headers.common['JSESSIONID'] = sessId;
				$http.defaults.headers.common['login'] = login;
			}			
		};
	}]);
})();
