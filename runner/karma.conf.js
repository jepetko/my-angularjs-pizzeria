//Karma configuration
module.exports = function(config) {
	
    config.set({
    	
        // base path, that will be used to resolve files and exclude
        basePath: '../WebContent',


        // frameworks to use
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'js/angular.js',
            'js/angular-resource.js',
            'js/angular-route.js',
            'js/angular-mocks.js',
            'js/angular-cookies.js',
            'js/jquery-1.11.1.min.js',
            'js/angular-gettext.js',
            
            //source code:            
            'js/app/**/*.js',
            
            //tests:
            'tests/*.test.js',
            
            //templates:
            'templates/*.html'
        ],


        // list of files to exclude
        exclude: [
            'js/app/application.min.js',
            'js/app/login.min.js'
        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'html'],
        
        htmlReporter: {
            outputFile: '../build/output.html',
            templatePath: __dirname+'/jasmine_template.html'
        },
        
        // generate js files from html templates
        preprocessors: {
          'templates/*.html': 'ng-html2js'
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['PhantomJS'],
        //browsers: ['Chrome'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 5000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};