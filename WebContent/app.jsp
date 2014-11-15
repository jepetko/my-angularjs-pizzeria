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
				
		<script src="js/app/shared/SharedServices.js"></script>
		<script src="js/app/users/UsersController.js"></script>		
		
      	<script src="js/app/shopping/ProductsCtrl.js"></script>
      	<script src="js/app/shopping/ProductsFactory.js"></script>
		<script src="js/app/shopping/ShoppingBagCtrl.js"></script>
		<script src="js/app/shopping/WizardDirective.js"></script>
		<script src="js/app/shopping/ShoppingApp.js"></script>	
		<script src="js/app/shopping/AddressCtrl.js"></script>			
		<script src="js/app/shopping/FinishCtrl.js"></script>
		
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
		<div class="panel panel-default">
		
				<div data-ng-controller="UsersController" data-ng-init="init('<%=login%>', '<%=sessID%>')">
			{{currentUser}}
		</div>	
			<div class="panel-heading">Awesome pizzeria shop</div>
			<div class="panel-body">
				<wizard></wizard>
				<ng-view></ng-view>
			</div>
		</div>
	</body>
</html>