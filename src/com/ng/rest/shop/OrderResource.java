package com.ng.rest.shop;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/orders")
public class OrderResource {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Order> getOrders() {
		List<Order> list = new ArrayList<Order>();
		list.addAll( OrderDao.instance.getModel() );
		return list;	
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Order saveOrder(Order order) {
		OrderDao.instance.addOrder(order);
		return order;
	}
}
