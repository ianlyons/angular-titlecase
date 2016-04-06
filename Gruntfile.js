'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bwr: grunt.file.readJSON('bower.json'),

    karma: {
      options: {
        frameworks: ['jasmine'],
        plugins: ['karma-jasmine', 'karma-phantomjs-launcher'],
        browsers: ['PhantomJS'],
        reporter: 'dots'
      },
      unit: {
        options: {
          files: [
            'bower_components/angular/angular.min.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'src/**/*.js',
            'test/**/*.spec.js'
          ],
          singleRun: true
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['<%= bwr.name %>']
      },
      test: {
        src: ['test/**/*.js']
      }
    },

    uglify: {
      options: {
        report: 'min',
        enclose: {
          'angular': 'angular'
        },
        banner: '/*\n  <%= bwr.name %> - v<%= bwr.version %> \n  ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n*/\n\n'+
        '/* commonjs package manager support (eg componentjs) */\n'+
        'if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {\n'+
        '  module.exports = "angular-md5";\n'+
        '}\n'
      },
      dist: {
        options: {
          beautify: false,
          mangle: true,
          compress: {
            global_defs: {
              'DEBUG': false
            },
            dead_code: true
          },
          sourceMap: '<%= bwr.name %>.min.js.map'
        },
        files: {
          '<%= bwr.name %>.min.js': ['./src/**/*.js']
        }
      },
      src: {
        options: {
          beautify: true,
          mangle: false,
          compress: false
        },
        files: {
          '<%= bwr.name %>.js': ['./src/**/*.js']
        }
      },
      buildDist: {
        options: {
          beautify: false,
          mangle: true,
          compress: {
            global_defs: {
              'DEBUG': false
            },
            dead_code: true
          },
          sourceMap: '<%= bwr.name %>.min.js.map'
        },
        files: {
          '<%= bwr.name %>.min.js': '.tmp/<%= bwr.name %>.js'
        }
      },
      buildSrc: {
        options: {
          beautify: {
            indent_level: 2,
            beautify: true
          },
          mangle: false,
          compress: false
        },
        files: {
          '<%= bwr.name %>.js': '.tmp/<%= bwr.name %>.js'
        }
      }

    }
  });

  // Testing task
  grunt.registerTask('test', [
    'karma'
  ]);

  // Build task
  grunt.registerTask('build', [
    'test',
    'uglify:buildSrc',
    'uglify:buildDist'
  ]);

  // Default task
  grunt.registerTask('default', [
    'build'
  ]);

};
