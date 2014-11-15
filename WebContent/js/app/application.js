angular.element(window).ready( function() {
    var parent = $('#main');
    angular.module('pizzeria-app', ['users', 'shared', 'shopping-app']);
    angular.bootstrap(parent,['pizzeria-app']);
});