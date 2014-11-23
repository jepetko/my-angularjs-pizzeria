angular.element(window).ready( function() {
    var parent = $('#main');
    angular.module('pizzeria-app', ['gettext', 'shopping-app'])    
    .run(['gettextCatalog', function(gettextCatalog) {
        gettextCatalog.setCurrentLanguage('en');
        gettextCatalog.debug = true;
	}] );
    angular.bootstrap(parent,['pizzeria-app']);
});