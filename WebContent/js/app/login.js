(function() {
	"use strict";
	
	angular.module('login', ['gettext'])
	.run( function(gettextCatalog) {
		gettextCatalog.setCurrentLanguage('de');
	    gettextCatalog.debug = true;		
	});
})();