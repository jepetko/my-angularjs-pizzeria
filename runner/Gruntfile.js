module.exports = function(grunt) {

	var continuousIntegrationMode = grunt.option('ci') || false;

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

		karma : {
			unit : {
				configFile : 'karma.conf.js'/*,
				                singleRun: continuousIntegrationMode,
				                reporters: continuousIntegrationMode ? ['junit'] : ['progress', 'html', 'story']*/
			}
		},

		protractor : {
			options : {
				confgFile : "node_modules/protractor/example/conf.js", // Default config file 
				keepAlive : true, // If false, the grunt process stops when the test fails. 
				noColor : false, // If true, protractor will not use colors in its output. 
				args : {
					// Arguments passed to the command 
				}
			},
			e2e : { // Grunt requires at least one target to run so you can simply put 'all: {}' here too. 
				options : {
					configFile : "e2e.conf.js", // Target-specific config file 
					args : {}
					// Target-specific arguments 
				}
			}
		},
		shell: {
	        startup: {
	            command: ['cd /opt/tomcat/bin', './catalina.sh jpda run'].join('&&')
	        },
	        shutdown: {
	        	command: ['cd /opt/tomcat/bin', './catalina.sh jpda stop'].join('&&')
	        }
	    }		
	});

	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('default', [ 'karma' ]);
	grunt.registerTask('specs', [ 'shell:startup', 'protractor:e2e', 'shell:shutdown' ])
};