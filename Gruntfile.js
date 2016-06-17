// This builds the library itself
module.exports = function (grunt) {
  // Configuration
  grunt.initConfig({
    jshint: {
      ignore_warning: {
        src: ['Gruntfile.js', 'umbrella.js'],
        options: {
          '-W043': true  // Allow for multiline with \ backslash
        }
      }
    },

    uglify: {
      options: {
        banner: '/* Umbrella JS ' + grunt.file.readJSON('package.json').version + ' umbrellajs.com */\n'
      },
      my_target: {
        files: {
          'umbrella.min.js': 'umbrella.js'
        }
      }
    },

    semistandard: {
      app: {
        src: [
          './plugins/**/!(test).js'
        ]
      }
    },

    watch: {
      scripts: {
        files: [
          'package.js', // To bump versions
          'Gruntfile.js',
          'src/*.js',
          'src/*.md',
          'src/**/*.*',
          'web/*.jade',
          'web/*'
        ],
        tasks: ['default'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    jade: {
      compile: {
        options: {
          client: false
        },
        files: [ {
          cwd: 'web',
          src: '**/*.html.jade',
          dest: '.',
          expand: true,
          ext: '.html'
        } ]
      }
    },

    mocha_phantomjs: {
      all: './tests.html',
      options: {
        'web-security': false
      }
    },

    concat: {
      main: {
        // No test files
        options: {
          process: function (src, file) {
            return /test\.js/.test(file) ? '' : src;
          }
        },
        files: {
          'umbrella.js': ['src/umbrella.js', 'src/plugins/**/*.js', 'src/export.js'],
          'documentation.md': ['src/readme.md', 'src/plugins/**/readme.md']
        }
      },
      test: {
        files: {
          'test/test.js': ['src/test.js', 'src/plugins/**/test.js']
        }
      }
    },

    bytesize: {
      all: {
        src: [
          'umbrella.min.js'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-semistandard');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
  grunt.loadNpmTasks('grunt-bytesize');

  grunt.registerTask('build', ['concat', 'uglify', 'jade']);
  grunt.registerTask('test', ['semistandard', 'mocha_phantomjs']);
  grunt.registerTask('default', ['build', 'test', 'bytesize']);
};
