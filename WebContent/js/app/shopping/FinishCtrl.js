(function() {
	"use strict";
	
	angular.module('finish-app', ['shoppingbag-app', 'orders-app'])
	.controller('FinishCtrl', ['$scope', '$filter', 'OrderService', 'ProductsService', function($scope, $filter, OrderService, ProductsService) {
		
		$scope.products = ProductsService.getProducts();
		$scope.bag = OrderService.getBag();
		
		$scope.getProductName = function(id) {
			var name = null;
			angular.forEach($scope.products, function(p) {
				if(""+p.id === ""+id) {
					name = p.name;
				}
			});
			return name;
		};
		
		$scope.getMessage = function() {
			if(OrderService.isEmpty()) {
				return 'Your bag is empty. Please add some pizzas to your bag.';
			}
			var msg = $filter('translate')('Thank you for your order. Here is the summary: ');
			var bag = OrderService.getBag();
			var i=0;
			for(var itm in bag) {
				if(i>0) {
					msg += ', ';
				}
				var count = bag[itm];
				msg += count + 'x ' + $scope.getProductName(itm);
				i++;
			}			
			return msg + '.';
		};
		
	}]);
	
})();