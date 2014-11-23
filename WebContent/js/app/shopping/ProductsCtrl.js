(function() {
	"use strict";
	
	angular.module('products-app', ['products-services', 'orders-services'])
	.filter('nospaces', function() {
		return function(input) {
			return input.replace(/\s+/g, '');
		};
	})
	.controller('ProductsCtrl', ['$scope', 'ProductsService', 'OrdersService', function($scope, ProductsService, OrdersService) {		
		$scope.products = ProductsService.getProducts();
		$scope.bag = OrdersService.getBag();
	}]);
})();
