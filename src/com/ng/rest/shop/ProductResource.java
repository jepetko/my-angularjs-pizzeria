package com.ng.rest.shop;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.ng.auth.AuthUtils;

@Path("/products")
public class ProductResource {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Product> getProducts(@Context HttpServletRequest request, @Context HttpServletResponse response) throws Exception {

		if(AuthUtils.isExpired(request, response)) {
			return null;
		}
		
		List<Product> list = new ArrayList<Product>();
		list.addAll( ProductDao.instance.getModel() );
		return list;	
	}	
}