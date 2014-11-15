(function() {
	"use strict";
	
	angular.module('products-ctrl', ['shoppingbag-app'])
	.filter('nospaces', function() {
		return function(input) {
			return input.replace(/\s+/g, '');
		};
	})
	.controller('ProductsCtrl', ['$scope', 'ProductsFactory', 'OrderService', function($scope, ProductsFactory, OrderService) {
		
		$scope.products = [];
		$scope.bag = OrderService.getBag();
		
		$scope.all = function() {
			return ProductsFactory.query(function(data) {
				$scope.products = data;
			});
		};
		
		$scope.init = function() {
			this.all();
		};
		
	}]);
})();
