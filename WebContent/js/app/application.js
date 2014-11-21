angular.element(window).ready( function() {
    var parent = $('#main');
    angular.module('pizzeria-app', ['gettext', 'users', 'shared', 'shopping-app', 'orders-app']);
    var appInjector = angular.bootstrap(parent,['pizzeria-app']);
    
    /*
    console.log(appInjector);
    var log = appInjector.get('$log');
    console.log( log.error );
    
    
    function formatError(arg) {
        if (arg instanceof Error) {
          if (arg.stack) {
            arg = (arg.message && arg.stack.indexOf(arg.message) === -1)
                ? 'Error: ' + arg.message + '\n' + arg.stack
                : arg.stack;
          } else if (arg.sourceURL) {
            arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line;
          }
        }
        return arg;
      }    
    
    log.error = function () {
        var args = [];
        angular.forEach(arguments, function(arg) {
          //args.push(formatError(arg));
        	args.push(arg);
        });
        console.log(args);
        //return logFn.apply(console, args);
        return {1: 'helo'};
    }; 
    */
});