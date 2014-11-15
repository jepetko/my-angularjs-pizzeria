package com.ng.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement
@Path("/greeting")
public class Greeting {
	
	private String greeting;
	
	public Greeting() {
		this.setGreeting("hello");
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)	
	public Greeting sayHello() {
		return new Greeting();
	}

	public String getGreeting() {
		return greeting;
	}

	public void setGreeting(String greeting) {
		this.greeting = greeting;
	}
	
}
