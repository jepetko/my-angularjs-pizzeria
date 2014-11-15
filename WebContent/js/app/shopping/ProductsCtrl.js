(function() {
	"use strict";
	
	angular.module('products-ctrl', ['shoppingbag-app'])
	.filter('nospaces', function() {
		return function(input) {
			return input.replace(/\s+/g, '');
		};
	})
	.controller('ProductsCtrl', ['$scope', 'ProductsFactory', 'BagService', function($scope, ProductsFactory, BagService) {
		
		$scope.products = [];
		$scope.bag = BagService.getBag();
		
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
