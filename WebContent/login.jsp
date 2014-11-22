<%
	//environment
	boolean prod = true;
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Login</title>
		
		<% if(prod) { %>
		
		<script src="js/jquery-1.11.1.min.js"></script>				    
		<script src="js/angular.min.js"></script>
		<script src="js/angular-cookies.min.js"></script>		
		<script src="js/angular-gettext.min.js"></script>	
		<script src="js/app/login.min.js"></script>
		
		<% } else { %>
		
		<script src="js/jquery-1.11.1.min.js"></script>				    
		<script src="js/angular.js"></script>
		<script src="js/angular-cookies.js"></script>		
		<script src="js/angular-gettext.js"></script>	
		<script src="js/app/login.js"></script>		
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
	<body id="login">

		<div class="container-fluid">
			<div class="row">
				<div class="col-xs-1 col-md-4">
				</div>
				<div class=" col-xs-10 col-md-4">
					<form role="form" action="login" method="POST">
						<div class="form-group">
							<label for="the_login" data-translate>Login</label> 
							<input type="text" class="form-control" name="login" id="the_login" placeholder="{{'Login' | translate}}">
						</div>
						<div class="form-group">
							<label for="the_password" data-translate>Password</label> 
							<input type="password" class="form-control" name="password" id="the_password" placeholder="{{'Password' | translate}}">
						</div>
						<input type="submit" class="btn btn-primary btn-lg btn-block" value="{{'Go!' | translate}}" />						
					</form>
				</div>
				<div class="col-xs-1 col-md-4">
				</div>			
			</div>
		</div>
		
	</body>
</html>
