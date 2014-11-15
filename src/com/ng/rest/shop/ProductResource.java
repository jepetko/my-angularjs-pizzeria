package com.ng.rest.shop;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/products")
public class ProductResource {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Product> getProducts() {
		List<Product> list = new ArrayList<Product>();
		list.addAll( ProductDao.instance.getModel() );
		return list;	
	}
	
}
