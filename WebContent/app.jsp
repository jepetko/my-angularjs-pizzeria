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
	
	//environment
	boolean prod = false;
%>
<!DOCTYPE html>
<html id="main">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">		
		<title data-translate>My Awesome Pizzeria</title>
			
		<% if(prod) { %>
		
			<script src="js/jquery-1.11.1.min.js"></script>				    
			<script src="js/angular.min.js"></script>
			<script src="js/angular-resource.min.js"></script>	
			<script src="js/angular-route.min.js"></script>	
			<script src="js/angular-cookies.min.js"></script>
			<script src="js/angular-gettext.min.js"></script>				
						
			<script src="js/app/application.min.js"></script>			
		
		<% } else {%>
		
			<script src="js/jquery-1.11.1.min.js"></script>				    
			<script src="js/angular.js"></script>
			<script src="js/angular-resource.js"></script>	
			<script src="js/angular-route.js"></script>	
			<script src="js/angular-cookies.js"></script>
			<script src="js/angular-gettext.js"></script>				
					
			<script src="js/app/shared/SharedServices.js"></script>
			<script src="js/app/shared/ProductsServices.js"></script>
			<script src="js/app/shared/OrdersServices.js"></script>
			
	      	<script src="js/app/shopping/ProductsCtrl.js"></script>
			<script src="js/app/shopping/ShoppingBagCtrl.js"></script>
			<script src="js/app/shopping/WizardDirective.js"></script>
			<script src="js/app/shopping/Validators.js"></script>
			
			<script src="js/app/shopping/ShoppingApp.js"></script>	
			<script src="js/app/shopping/AddressCtrl.js"></script>			
			<script src="js/app/shopping/FinishCtrl.js"></script>			
			<script src="js/app/shopping/OrdersCtrl.js"></script>		
			
			<script src="js/app/application.js"></script>
			<script src="js/app/translations.js"></script>
				
		<% } %>	
		
		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css">

		<!-- Optional theme -->
		<link rel="stylesheet" href="vendor/bootstrap/css/bootstrap-theme.min.css">

		<!-- Latest compiled and minified JavaScript -->
		<script src="vendor/bootstrap/js/bootstrap.min.js"></script>	
		
		<link rel="stylesheet" href="css/shopping-app.css">
		
	</head>
	<body data-ng-controller="AppCtrl" data-ng-init="setUserCredentials('<%=login%>', '<%=sessID%>')">	

		<nav class="navbar navbar-default" role="navigation">
		  <div class="container-fluid">
		    <div class="navbar-header">
		      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		        <span class="sr-only" data-translate>Toggle navigation</span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>
		      <span class="navbar-brand" data-translate>My Awesome Pizzeria</span>
		    </div>
		    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		      <ul class="nav navbar-nav navbar-right">
		        <li class="dropdown">
		          <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{{'User' | translate}}: {{currentUser}} <span class="caret"></span></a>
		          <ul class="dropdown-menu" role="menu">
		            <li>
		            	<a href="javascript:void(0);" data-ng-click="changeLanguage('de')" data-translate>German</a>
		            </li>		            
		           	<li>
						<a href="javascript:void(0);" data-ng-click="changeLanguage('en')" data-translate>English</a>
		            </li>
		            <li class="divider">
		            </li>	
		            <li>
		            	<a href="<%=response.encodeURL("LogoutServlet") %>" data-translate>Logout</a>
		            </li>
		          </ul>
		        </li>
		      </ul>
		    </div><!-- /.navbar-collapse -->
		  </div><!-- /.container-fluid -->
		</nav>
			
		<div class="panel panel-default">		
			<div class="panel-heading" data-translate>Please, use this wizard to order some pizzas.</div>
			<div class="panel-body">
				<x-wizard c="getOrderCount()"></x-wizard>
				<x-ng-view></x-ng-view>
				<div class="panel panel-default">
		  			<div class="panel-body copyright-body">
			  				&copy; leanetic IT Consulting, {{'all rights reserved' | translate}}		  						
					</div>
		  		</div>
			</div>
		</div>
	
	</body>
</html>