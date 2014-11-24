angular.module('shared', ['ngCookies'])
.service('cookieHandler', ['$rootScope', '$window', '$cookies', function($rootScope, $window, $cookies) {
	
	this.get = function(name) {
		return $cookies[name];
	};
	
	this.unset = function(name) {
		delete $cookies[name];
	};
}])
.service('StringUtils', [function() {
	this.trim = function(str) {
		if(!str) {
			return '';
		}
		return str.replace(/^\s+/g,'').replace(/\s+$/,'');
	};
}]);