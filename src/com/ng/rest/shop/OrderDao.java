package com.ng.rest.shop;

import java.util.ArrayList;
import java.util.Date;
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
		List<Item> items = order.getItems();
		for(Item itm : items) {
			Product p = itm.getProduct();
			itm.setProduct( ProductDao.instance.getById(p.getId()) );
		}		
		orders.add(order);
		order.setDate(new Date());
	}
}
