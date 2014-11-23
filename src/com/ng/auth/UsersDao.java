package com.ng.auth;

import java.util.ArrayList;
import java.util.List;

public enum UsersDao {	
	instance;
	private List<User> users = new ArrayList<User>();
	
	private UsersDao() {		
		users.add( new User("hansi", "huber", "Hansi", "Huber"));
		users.add( new User("max", "gruber", "Maximilian", "Gruber", true));
	}
	
	public User query(String login, String password) {
		for(User user : users) {
			if(user.matches(login, password)) {
				return user;
			}
		}
		return null;
	}
	
	public User getByLogin(String login) {
		for(User user : users) {
			if(user.getLogin().equals(login)) {
				return user;
			}
		}
		return null;
	}
	
	public List<User> getModel() {
		return users;
	}
}
