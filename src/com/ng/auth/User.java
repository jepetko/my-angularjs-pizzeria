package com.ng.auth;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class User {
	
	private String login;
	private String password;
	private String name;
	private String surname;
	private boolean admin;
	
	public User() {}
	
	public User(String login, String password, String name, String surname) {
		this.login = login;
		this.password = password;
		this.name = name;
		this.surname = surname;
	}
	
	public User(String login, String password, String name, String surname, boolean admin) {
		this(login, password, name, surname);
		this.admin = admin;
	}
	
	public boolean matches(String login, String password) {
		return this.login.equals(login) && this.password.equals(password);
	}
}
