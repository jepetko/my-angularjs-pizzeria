package com.ng.rest.shop;

public class Order {
	
	private Product p;
	private int count;
	
	Order(Product p, int count) {
		this.p =  p;
		this.count = count;
	}

	public Product getP() {
		return p;
	}

	public void setP(Product p) {
		this.p = p;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
}
