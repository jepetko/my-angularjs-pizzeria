(function() {
	"use strict";
	
	angular.module('finish-app', ['products-services', 'orders-services'])
	.controller('FinishCtrl', ['$scope', 'OrdersService', 'ProductsService', function($scope, OrdersService, ProductsService) {
		
		$scope.products = ProductsService.getProducts();
		
		$scope.getProductName = function(id) {
			var name = null;
			angular.forEach($scope.products, function(p) {
				if(""+p.id === ""+id) {
					name = p.name;
				}
			});
			return name;
		};
		
		$scope.createProductsSummaryMessage = function() {
			var msg = '';
			var bag = OrdersService.getBag();
			var i=0;
			for(var itm in bag) {
				if(i>0) {
					msg += ', ';
				}
				var count = bag[itm];
				msg += count + 'x ' + $scope.getProductName(itm);
				i++;
			}			
			return msg;
		};
		
		$scope.createMessage = function() {			
			if(OrdersService.isBagEmpty() || !OrdersService.isAddressValid()) {
				return 'Your bag is empty or the address invalid. Please add some pizzas to your bag and complete your address data.';
			}
			if(!OrdersService.isCurrentOrderSent()) {
				return "Your order hasn't been sent yet. Please press the 'Done!' button!";
			}
			return 'Thank you for your order. Here is the summary: ';
		};
	}]);
	
})();