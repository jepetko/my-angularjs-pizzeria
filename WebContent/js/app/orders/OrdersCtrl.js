(function() {
	"use strict";
	
	angular.module('orders-app', [])
	.factory('Orders', ['$resource', function($resource) {
		return $resource('payment/orders/:id', null, { save : {method: 'POST'} });
	}])
	.service('OrderService', ['Orders', function(Orders) {
		this.address = {};
		this.bag = {};
		this.orders = [];
		
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
			
			var items = [];
			for(var id in this.bag) {
				var count = parseInt(this.bag[id], 10);
				var item = { product: { id: id }, count: count };
				items.push(item);
			}
			var order = {items : items, address: this.address};
			
			Orders.save(order, function(data) {
				//could do something here
			});
		};
	}]);
	
})();