package com.ng.rest.shop;

import java.util.ArrayList;
import java.util.List;

public enum ProductDao {
	
	instance;
	private List<Product> products = new ArrayList<Product>();
	
	private ProductDao() {
		products.add(new Product(1, "Margharita", 5.f));
		products.add(new Product(2, "Cardinale", 6.5f));
		products.add(new Product(3, "Prosciuto", 8.5f));
		products.add(new Product(4, "Tonno", 7.5f));
		products.add(new Product(5, "Quattro Stagioni", 8f));
		products.add(new Product(6, "Familien-Pizza", 12f));
	}
	
	public List<Product> getModel() {
		return products;
	}
}
