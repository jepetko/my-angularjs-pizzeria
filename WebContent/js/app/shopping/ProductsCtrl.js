(function() {
	"use strict";
	
	angular.module('products-ctrl', ['shoppingbag-app'])
	.filter('nospaces', function() {
		return function(input) {
			return input.replace(/\s+/g, '');
		};
	})
	.controller('ProductsCtrl', ['$scope', 'ProductsService', 'OrderService', function($scope, ProductsService, OrderService) {		
		$scope.products = ProductsService.getProducts();
		$scope.bag = OrderService.getBag();
	}]);
})();
