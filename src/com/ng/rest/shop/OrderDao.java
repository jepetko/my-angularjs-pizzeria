package com.ng.rest.shop;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ng.auth.User;

public enum OrderDao {
	
	instance;
	private Map<User,List<Order>> orders = new HashMap<User,List<Order>>();
	
	private OrderDao() {
	}
	
	public List<Order> getModel(User user) {		
		return orders.get(user);
	}
	
	public void addOrder(Order order, User user) {		
		List<Item> items = order.getItems();
		for(Item itm : items) {
			Product p = itm.getProduct();
			itm.setProduct( ProductDao.instance.getById(p.getId()) );
		}
		List<Order> existingOrders = orders.get(user);
		if(existingOrders == null) {
			existingOrders = new ArrayList<Order>();
			orders.put(user, existingOrders);
		}
		existingOrders.add(order);
		order.setDate(new Date());
	}
}
