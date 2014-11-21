package com.ng.rest.shop;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.ng.auth.AuthUtils;
import com.ng.auth.User;

@Path("/orders")
public class OrderResource {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Order> getOrders(@Context HttpServletRequest request, @Context HttpServletResponse response) throws Exception {
		
		if(AuthUtils.isExpired(request, response)) {
			return null;
		}
		
		User user = AuthUtils.getUserFromSession(request);
		if(user == null) {
			return new ArrayList<Order>();
		}
		return OrderDao.instance.getModel(user);
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Order saveOrder(Order order, @Context HttpServletRequest request,  @Context HttpServletResponse response) throws Exception {
		
		if(AuthUtils.isExpired(request, response)) {
			return null;
		}
		
		User user = AuthUtils.getUserFromSession(request);
		if(user != null) {
			OrderDao.instance.addOrder(order, user);
		}
		return order;
	}
}
