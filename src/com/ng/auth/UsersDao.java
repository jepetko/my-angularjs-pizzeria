package com.ng.auth;

import java.util.ArrayList;
import java.util.List;

public enum UsersDao {	
	instance;
	private List<User> users = new ArrayList<User>();
	
	private UsersDao() {		
		users.add( new User("user", "user", "Ernst", "Gruber"));
		users.add( new User("admin", "admin", "Hubert", "Maier", true));
	}
	
	public User query(String login, String password) {
		for(User user : users) {
			if(user.matches(login, password)) {
				return user;
			}
		}
		return null;
	}
	
	public List<User> getModel() {
		return users;
	}
}
