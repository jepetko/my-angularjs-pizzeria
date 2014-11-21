package com.ng.auth;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class AuthUtils {
	
	private AuthUtils() {}
	
	public static User getUserFromSession(HttpServletRequest request) {
		if(request == null) {
			return null;
		}
		HttpSession sess = request.getSession(false);
		String login = null;
		if(sess != null) {
			login = (String) sess.getAttribute("login");
		}		
		if(login == null) {
			//Fix: for those browsers not supporting cookies
			login = request.getHeader("login");
		}
		if(login != null) {
			return UsersDao.instance.getByLogin(login);
		} else {
			return null;
		}
	}
	
	public static boolean isExpired(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession sess = request.getSession(false);
		String sessId = null;
		if(sess != null) {
			sessId = sess.getId();
		} else {			
			//Fix: for those browsers not supporting cookies
			sessId = request.getHeader("JSESSIONID");
			response.setHeader("Set-Cookie", "JSESSIONID=" + sessId);
		}
		if(!SessionListener.isAlive(sessId)) {
			response.setStatus(401);
			response.getWriter().write("Session expired");
			response.flushBuffer();
			return true;
		}
		return false;
	}
}
