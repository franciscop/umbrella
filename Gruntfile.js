fs = require('fs');

// This builds the library itself
module.exports = function (grunt) {

  // Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    uglify: {
      options: { banner: '/* Umbrella JS ' + require('./package').version + ' umbrellajs.com */\n'},
      build: { src: 'umbrella.js', dest: 'umbrella.min.js' }
    },

    watch: {
      scripts: {
        files: [
          'Gruntfile.js',
          'src/*.js',
          'src/*.md',
          'src/plugins/*.js',
          'src/plugins/*/*.js',
        ],
        tasks: ['default'],
        options: { spawn: false, },
      }
    }
  });

  // Dynamically add plugins to the concat
  grunt.registerTask("parse", "Join and concatenate", function(){
    
    // get the current concat config
    var concat = {
      main: { src: [ 'src/umbrella.js' ], dest: 'umbrella.js' },
      test: { src: [ 'src/test.js' ], dest: 'test/test.js' },
      docs: { src: [ 'src/documentation.md' ], dest: 'documentation.md' }
    };
    
    fs.readdirSync(__dirname + "/src/plugins").forEach(function(name, i){
      var file = 'src/plugins/' + name + '/' + name + '.js';
      var test = 'src/plugins/' + name + '/test.js';
      var doc = 'src/plugins/' + name + '/documentation.md';
      
      if (!fs.existsSync(file)) throw new Error("File '" + file + "' doesn't exist");
      //if (!fs.existsSync(test)) throw new Error("Plugin '" + file + "' doesn't have any test");
      
      concat.main.src.push(file);
      concat.test.src.push(test);
      concat.docs.src.push(doc);
    });
    
    // save the new concat configuration
    grunt.config.set('concat', concat);
  });

  // Concatenate
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Minify
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Watch
  grunt.loadNpmTasks('grunt-contrib-watch');


  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal
  grunt.registerTask('default', ['parse', 'concat', 'uglify']);
};
