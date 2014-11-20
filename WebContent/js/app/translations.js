angular.module('gettext').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('de', {"Go!":"Los!","Login":"Login","Password":"Passwort"});
/* jshint +W100 */
}]);