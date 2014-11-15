(function() {
	"use strict";

	angular.module('shopping-app', ['ngRoute', 'wizard-components', 'products-services', 
	                                'products-ctrl', 'shoppingbag-app', 'address-app', 'finish-app'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		
		$routeProvider
		.when('/select', {templateUrl: 'templates/products.html'})
		.when('/bag', {templateUrl: 'templates/bag.html'})
		.when('/address', {templateUrl: 'templates/address.html'})
		.when('/finish', {templateUrl: 'templates/finish.html'})
		.otherwise({redirectTo: '/select'});
		
		$locationProvider.hashPrefix('!');
	}]);	
})();
