(function() {
	"use strict";
	
	angular.module('login', ['gettext'])
	.run( function(gettextCatalog) {
		gettextCatalog.setCurrentLanguage('en');
	    gettextCatalog.debug = true;		
	});
})();