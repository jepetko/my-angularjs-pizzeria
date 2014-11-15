angular.module('users', [])
.controller('UsersController', ['$scope', 'cookieHandler', function($scope, cookieHandler) {	
	
	$scope.init = function(login, sessId) {
		if(cookieHandler.get('login')) {
			$scope.currentUser = cookieHandler.get('login');
		} else {
			$scope.currentUser = login;
			$scope.sessionId = sessId;
		}
	};
	
}]);