package com.ng.auth;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
 
public class SessionListener implements HttpSessionListener {
	
	private static List<String> sessions = new ArrayList<String>();
 
    public void sessionCreated(HttpSessionEvent event) {
    	sessions.add(event.getSession().getId());
    	
    	System.out.println(">> sessionCreated");
    	System.out.println("**************************+++");
    	for(int i=0; i<sessions.size();i++) {
    		System.out.println(sessions.get(i));
    	}
    	System.out.println("**************************+++");
    }
 
    public void sessionDestroyed(HttpSessionEvent event) {
    	String sessId = event.getSession().getId();
    	int idx = sessions.indexOf(sessId);
    	if(idx != -1) {
    		sessions.remove(idx);
    	}
    	
    	System.out.println("<< sessionDestroyed");
    	System.out.println("**************************+++");
    	for(int i=0; i<sessions.size();i++) {
    		System.out.println(sessions.get(i));
    	}
    	System.out.println("**************************+++");    	
    }
    
    public static boolean isAlive(String sessId) {
    	if(sessId == null) {
    		return false;
    	}
    	return sessions.contains(sessId);
    }
    public static boolean isAlive(HttpSession session) {
    	if(session == null) {
    		return false;
    	}
    	return isAlive(session.getId());
    }
}