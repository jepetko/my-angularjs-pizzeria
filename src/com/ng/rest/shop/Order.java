package com.ng.rest.shop;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Order {

	private List<Item> items;
	private Address address;
	
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd.MM.yyyy,HH:mm", timezone="CET")
	private Date date;
    
    private Double total;
	
	public Order() {
		this.date = new Date();
	}
	
	public Order(List<Item> items) {
		this();
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
	
	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}	
	
	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	
	public Double getTotal() {
		if(items == null) {
			return 0.0;
		}
		double total = 0.0;
		for(Item itm : items) {
			total += itm.getCount() * itm.getProduct().getPrice();
		}
		return total;
	}
}
