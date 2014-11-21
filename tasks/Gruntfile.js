'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        // Task configuration.
        jshint: {
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            src: {
                src: ['../WebContent/js/app-**/*.js', '../WebContent/tests/*.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src']
            }
        },
        nggettext_extract: {
			pot: {
				files: {
					'po/template.pot': ['../WebContent/*.html', '../WebContent/templates/*.html', '../WebContent/js/app/**/*.js', '../WebContent/app.jsp']
				}
			}
        },
		nggettext_compile: {
			all: {
				files: {
					'../WebContent/js/app/translations.js': ['po/de.po', 'po/sk.po']
				}
			}
		}
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-angular-gettext');

    // Default task.
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('extract', ['nggettext_extract']);
    grunt.registerTask('compile', ['nggettext_compile']);    
};