angular.element(window).ready( function() {
    var parent = $('#main');
    angular.module('pizzeria-app', ['gettext', 'shared', 'shopping-app', 'orders-app'])    
    .run(['gettextCatalog', function(gettextCatalog) {
        gettextCatalog.setCurrentLanguage('de');
        gettextCatalog.debug = true;
	}] );
    angular.bootstrap(parent,['pizzeria-app']);
});