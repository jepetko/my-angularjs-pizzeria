(function() {
	"use strict";
	
	angular.module('orders-app', ['orders-services'])
	.controller('OrdersCtrl', ['$scope', 'OrdersService', function($scope, OrdersService) {
		$scope.orders = OrdersService.getPendingOrders();
	}]);
	
})();