(function() {
	
	"use strict";
		
	angular.module('shoppingbag-app',['products-services'])
	.service('BagService', function() {
		this.bag = {};
		this.getBag = function() {
			return this.bag;
		};
		this.isEmpty = function() {
			for(var key in this.bag) {
				return false;
			}
			return true;
		};
	})
	.controller('ShoppingBagCtrl', ['$scope', 'BagService', 'ProductsFactory', function($scope, BagService, ProductsFactory) {
		
		$scope.bag = BagService.getBag();
		
		/**
		 * query all products in order to display product name and price
		 */
		$scope.all = function() {
			return ProductsFactory.query(function(data) {
				$scope.products = {};
				for(var i=0;i<data.length;i++) {
					var row = data[i];
					var id = row.id;
					$scope.products['' + id] = row;
				}			
			});
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