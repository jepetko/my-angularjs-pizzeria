(function() {
	"use strict";
	
	angular.module('orders-app', ['shared'])
	.factory('Orders', ['$resource', function($resource) {
		return $resource('payment/orders/:id', null, { save : {method: 'POST'} });
	}])
	.service('OrderService', ['Orders', 'StringUtils', function(Orders, StringUtils) {
		this.address = {};
		this.bag = {};
		this.orders = [];
		
		this.cleanUp = function() {
			if(!this.address.payment) {
				return;
			}
			this.address.payment = StringUtils.trim(this.address.payment);
		};
		
		this.getBag = function() {
			return this.bag;
		};
		
		this.isEmpty = function() {
			for(var key in this.bag) {
				return false;
			}
			return true;
		};
		
		this.getPendingOrders = function() {
			return Orders.query( (function(self) {
				return function(data) {
					self.orders = data;					
				}
			})(this) );			
		};
		
		this.sendOrder = function() {
			this.cleanUp();
			
			var items = [];
			for(var id in this.bag) {
				var count = parseInt(this.bag[id], 10);
				var item = { product: { id: id }, count: count };
				items.push(item);
			}
			var order = {items : items, address: this.address};
			
			Orders.save(order, (function(self) {
				return function(data) {
					self.getPendingOrders();
				};				
			})(this));
		};
		
		//initialize orders:
		this.orders = this.getPendingOrders();
	}])
	.controller('OrdersCtrl', ['OrderService', '$scope', function(OrderService, $scope) {
		$scope.orders = OrderService.orders;
	}]);
	
})();