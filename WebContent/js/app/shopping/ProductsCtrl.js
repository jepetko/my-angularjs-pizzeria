(function() {
	"use strict";
	
	angular.module('products-ctrl', ['shoppingbag-app'])
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
