package com.ng.auth;

import java.io.IOException;
 
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
 
/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
 
	private static final long serialVersionUID = -9010820158191189915L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
 
        String login = request.getParameter("login");
        String password = request.getParameter("password");
        
        User user = UsersDao.instance.query(login, password);         
        if(user != null) {
            HttpSession session = request.getSession();
            session.setAttribute("login", login);            
            session.setMaxInactiveInterval(30*60); //session dauert 30 Minuten
            
            Cookie loginCookie = new Cookie("login", login);
            response.addCookie(loginCookie);
            
            //Get the encoded URL string
            String encodedURL = response.encodeRedirectURL("app.jsp");
            response.sendRedirect(encodedURL);
        } else {
            RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/login.html?ERR=1");
            dispatcher.forward( request, response ); 
        }
    } 
}