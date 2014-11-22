(function() {
	
	"use strict";
		
	angular.module('shoppingbag-app',['products-services', 'orders-app'])
	.controller('ShoppingBagCtrl', ['$scope', 'OrdersService', 'ProductsService', function($scope, OrdersService, ProductsService) {
		
		$scope.bag = OrdersService.getBag();
		
		/**
		 * query all products in order to display product name and price
		 */
		$scope.all = function() {
			var products = ProductsService.getProducts();
			$scope.products = {};
			for(var i=0;i<products.length;i++) {
				var row = products[i];
				var id = row.id;
				$scope.products['' + id] = row;
			}			
		};	
		
		/**
		 * get product by name
		 */
		$scope.getProductById = function(id) {	
			if(!$scope.products) {
				return {};
			}
			return $scope.products[id];
		};	
		
		$scope.getTotal = function(id) {
			if(!$scope.products) {
				return {};
			}
			var p = $scope.getProductById(id);
			return p.price * $scope.bag[id];
		};
		
		$scope.getGrandTotal = function() {
			if(!$scope.bag) {
				return 0;
			}
			var grandTotal = 0;
			for(var id in $scope.bag) {
				var p = $scope.getProductById(id);
				grandTotal += p.price * $scope.bag[id];
			}
			return grandTotal;
		};
		
		/**
		 * initialize products
		 */
		$scope.init = function() {
			this.all();
		};
		
		
		//remove empty values e.g. {1 : ""}
		var cleanUp = (function(s) {
			return function(newValue) {
				if(newValue) {
					for(var a in newValue) {
						if(newValue[a] === "") {
							delete s.bag[a];
						}
					}
				}	
			};
		})($scope);
		
		$scope.$watch('bag', function(newValue) {
			cleanUp(newValue);
		}, true);
		
	}]);
	
})();