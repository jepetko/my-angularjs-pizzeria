(function() {
	
	"use strict";
	
	angular.module('products-services', ['ngResource'])
	.factory('ProductsFactory', ['$resource', function($resource) {
		return $resource('shop/products/:id');
	}])
	.service('ProductsService', ['ProductsFactory', function(ProductsFactory) {
		this.products = [];
		ProductsFactory.query((function(self) {
			return function(data) {
				angular.forEach(data, function(e) {
					self.products.push(e);
				});
			};
		})(this));
		this.getProducts = function() {
			return this.products;
		};
	}]);	
})();
