angular.module('shared', ['ngCookies'])
.service('cookieHandler', ['$rootScope', '$window', '$cookies', function($rootScope, $window, $cookies) {
	
	//possible fix for http://stackoverflow.com/questions/19402028/adding-a-hash-prefix-at-the-config-phase-if-its-missing
    $rootScope.$watch(function() { return $window.location.href; }, function(val) {    	
    });
	
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