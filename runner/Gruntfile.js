module.exports = function(grunt) {

    var continuousIntegrationMode = grunt.option('ci') || false;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        karma: {
            unit: {
                configFile: 'karma.conf.js'/*,
                singleRun: continuousIntegrationMode,
                reporters: continuousIntegrationMode ? ['junit'] : ['progress', 'html', 'story']*/
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['karma']);
};