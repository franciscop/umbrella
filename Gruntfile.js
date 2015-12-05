fs = require('fs');

// This builds the library itself
module.exports = function (grunt) {

  // Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    uglify: { build: { src: 'umbrella.js', dest: 'umbrella.min.js' } },

    watch: {
      scripts: {
        files: [
          'src/*.js',
          'src/plugins/*.js',
        ],
        tasks: ['default'],
        options: { spawn: false, },
      }
    }
  });

  // Dynamically add plugins to the concat
  grunt.registerTask("parse", "Join and concatenate", function(){
    
    // get the current concat config
    var concat = { dir: { src: [ 'src/umbrella.js' ], dest: 'umbrella.js' } };
    
    fs.readdirSync(__dirname + "/src/plugins").forEach(function(name, i){
      var file = 'src/plugins/' + name + '/' + name + '.js';
      if (!fs.existsSync(file)) throw new Error("File '" + file + "' doesn't exist");
      
      concat.dir.src.push(file);
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
