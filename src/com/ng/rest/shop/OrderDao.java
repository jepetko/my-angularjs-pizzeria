package com.ng.rest.shop;

import java.util.ArrayList;
import java.util.List;

public enum OrderDao {
	
	instance;
	private List<Order> orders = new ArrayList<Order>();
	
	private OrderDao() {
	}
	
	public List<Order> getModel() {
		return orders;
	}
	
	public void addOrder(Order order) {
		orders.add(order);
	}
}
