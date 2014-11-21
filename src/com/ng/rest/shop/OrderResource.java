package com.ng.rest.shop;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.ng.auth.User;
import com.ng.auth.UsersDao;

@Path("/orders")
public class OrderResource {
	
	private User getUserFromSession(HttpServletRequest request) {
		if(request == null) {
			return null;
		}
		HttpSession sess = request.getSession();
		String login = (String) sess.getAttribute("login");
		if(login == null) {
			login = request.getHeader("login");
		}
		if(login != null) {
			return UsersDao.instance.getByLogin(login);
		} else {
			return null;
		}
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Order> getOrders(@Context HttpServletRequest request) {
		User user = getUserFromSession(request);
		if(user == null) {
			return new ArrayList<Order>();
		}
		return OrderDao.instance.getModel(user);
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Order saveOrder(Order order, @Context HttpServletRequest request) {
		User user = getUserFromSession(request);
		if(user != null) {
			OrderDao.instance.addOrder(order, user);
		}
		return order;
	}
}
