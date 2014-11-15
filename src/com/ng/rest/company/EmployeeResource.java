package com.ng.rest.company;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/employees")
public class EmployeeResource {
	
	@GET
	@Produces({MediaType.APPLICATION_JSON})
	public List<Employee> getEmployees() {
		List<Employee> list = new ArrayList<Employee>();
		list.addAll( EmployeeDao.instance.getModel() );
		return list;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
    @Path("{id}")
	public Employee getEmployee(@PathParam("id") String id) {
		int _id = Integer.parseInt(id);
		return EmployeeDao.instance.getModel().get(_id-1);		
	}
}
