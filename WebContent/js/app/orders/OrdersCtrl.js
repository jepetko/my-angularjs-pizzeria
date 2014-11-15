(function() {
	"use strict";
	
	angular.module('orders-app', [])
	.factory('Orders', ['$resource', function($resource) {
		return $resource('shop/orders/:id', null, { save : {method: 'POST'} });
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
			Orders.query( (function(self) {
				return function(data) {
					self.orders = data;
				}
			})(this) );			
		};
		
		this.sendOrder = function() {
			console.log(Orders);
			Orders.save(this.bag, function(data) {
				console.log(data);
			});/*
			.success(function(data) {
				console.log(data);
				getPendingOrders();
			});*/
		};
	}]);
	
})();