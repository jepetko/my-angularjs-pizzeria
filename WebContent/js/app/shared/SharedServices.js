angular.module('shared', ['ngCookies'])
.service('cookieHandler', ['$rootScope', '$window', '$cookies', function($rootScope, $window, $cookies) {
	return {
		get: function(name) {
			return $cookies[name];
		}
	}
}]);