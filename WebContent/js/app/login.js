angular.element(window).ready( function() {
	var parent = $('#login');
	angular.module('login', ['gettext'])
	.run(['gettextCatalog', function(gettextCatalog) {
		gettextCatalog.setCurrentLanguage('en');
        gettextCatalog.debug = true;		
	}] );
    angular.bootstrap(parent,['login']);
});