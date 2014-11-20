<%
	if (session.getAttribute("login") == null) {
		response.sendRedirect("login.html");
	}

	String login = null;
	String sessID = null;
	Cookie[] cookies = request.getCookies();
	if (cookies != null) {
		for (Cookie cookie : cookies) {
			if (cookie.getName().equals("login"))
				login = cookie.getValue();
			if (cookie.getName().equals("JSESSIONID"))
				sessID = cookie.getValue();
		}
	} else {
		login = (String) session.getAttribute("login");
		sessID = session.getId();
	}
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>My Awesome Pizzeria</title>
				
		<script src="js/jquery-1.11.1.min.js"></script>				    
		<script src="js/angular.js"></script>
		<script src="js/angular-resource.js"></script>	
		<script src="js/angular-route.js"></script>	
		<script src="js/angular-cookies.js"></script>
		<script src="js/angular-gettext.js"></script>				
				
		<script src="js/app/shared/SharedServices.js"></script>
		<script src="js/app/users/UsersController.js"></script>		
		
      	<script src="js/app/shopping/ProductsCtrl.js"></script>
      	<script src="js/app/shopping/ProductsFactory.js"></script>
		<script src="js/app/shopping/ShoppingBagCtrl.js"></script>
		<script src="js/app/shopping/WizardDirective.js"></script>
		<script src="js/app/shopping/ShoppingApp.js"></script>	
		<script src="js/app/shopping/AddressCtrl.js"></script>			
		<script src="js/app/shopping/FinishCtrl.js"></script>
		
		<script src="js/app/orders/OrdersCtrl.js"></script>		
		
		<script src="js/app/application.js"></script>
		
		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css">

		<!-- Optional theme -->
		<link rel="stylesheet" href="vendor/bootstrap/css/bootstrap-theme.min.css">

		<!-- Latest compiled and minified JavaScript -->
		<script src="vendor/bootstrap/js/bootstrap.min.js"></script>	
		
		<link rel="stylesheet" href="css/shopping-app.css">
		
	</head>
	<body id="main">	

		<nav class="navbar navbar-default" role="navigation">
		  <div class="container-fluid">
		    <div class="navbar-header">
		      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		        <span class="sr-only">Toggle navigation</span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>
		      <span class="navbar-brand">My Awesome Pizzeria</span>
		    </div>
		    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		      <ul class="nav navbar-nav navbar-right" data-ng-controller="UsersController" data-ng-init="init('<%=login%>', '<%=sessID%>')">
		        <li class="dropdown">
		          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">User: {{currentUser}} <span class="caret"></span></a>
		          <ul class="dropdown-menu" role="menu">
		            <li>
		            	<a href="<%=response.encodeURL("LogoutServlet") %>">Logout</a>
		            </li>
		          </ul>
		        </li>
		      </ul>
		    </div><!-- /.navbar-collapse -->
		  </div><!-- /.container-fluid -->
		</nav>
			
		<div class="panel panel-default" data-ng-controller="AppCtrl">		
			<div class="panel-heading">Please, use this wizard to order some pizzas.</div>
			<div class="panel-body">
				<wizard c="getOrderCount()"></wizard>
				<ng-view></ng-view>
			</div>
		</div>
	</body>
</html>