(function() {
	
	"use strict";
	
	angular.module('products-services', ['ngResource'])
	.factory('ProductsFactory', ['$resource', function($resource) {
		return $resource('shop/products/:id');
	}]);
	
})();
