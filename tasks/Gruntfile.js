'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            '*/\n',
            
        // Task configuration.
        uglify: {
            options: {
                //banner: '<%= banner %>',
                mangle: {
                    except: ['jQuery']
                }
            },
            js: {
                files: {
                    '../WebContent/js/app/login.min.js': ['../WebContent/js/app/login.js', '../WebContent/js/app/translations.js'],
                    '../WebContent/js/app/application.min.js': ['../WebContent/js/app/shared/*.js','../WebContent/js/app/orders/*.js',
                                                                '../WebContent/js/app/shopping/*.js','../WebContent/js/app/application.js', '../WebContent/js/app/translations.js']
                }
            }
        },
        jshint: {
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            src: {
                src: ['../WebContent/js/app/*.js', '../WebContent/tests/*.js', '!../WebContent/js/app/*.min.js']
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
    grunt.loadNpmTasks('grunt-contrib-uglify');


    // Default task.
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('extract', ['nggettext_extract']);
    grunt.registerTask('compile', ['nggettext_compile']);    
};