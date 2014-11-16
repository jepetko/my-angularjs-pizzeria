package com.ng.rest.shop;

import java.util.ArrayList;
import java.util.List;

public class Order {

	private List<Item> items;
	
	public Order() {
		
	}
	
	public Order(List<Item> items) {
		this.items = items;
	}
	
	public Order(Item[] arr) {
		if(items == null) {
			items = new ArrayList<Item>();
		}
		for(Item itm : arr) {
			items.add(itm);
		}
	}
	
	public List<Item> getItems() {
		return items;
	}
	
	public void setItems(List<Item> items) {
		this.items = items;
	}
}
