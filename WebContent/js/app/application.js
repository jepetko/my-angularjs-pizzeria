angular.element(window).ready( function() {
    var parent = $('#main');
    angular.module('pizzeria-app', ['gettext', 'users', 'shared', 'shopping-app', 'orders-app']);
    angular.bootstrap(parent,['pizzeria-app']);
});