/**
 * Created by kingblogenv on 28/2/16.
 */

module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    copy:{
      copyLibsMinJs:{
        expand : true,
        cwd: 'bower_components',
        src:['**/*.min.js'],
        dest: 'public/scripts/'
      },
      copyLibsMinCss:{
        expand : true,
        cwd: 'bower_components',
        src:['**/*.css'],
        dest: 'public/styles/'
      }
    },
    jshint: {
      checkSyntax:{
        options: {
          jshintrc: '.jshintrc',
          ignores: [
            'bower_components/**',
            'node_modules/**'
          ]
        },
        src: ['gruntfile.js', 'app.js']
      }
    },
    uglify: {
      zipCode: {
        src: 'public/scripts/jquery.js',
        dest: 'public/scripts/jquery.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('copyAllJs', ['copy:copyLibsMinJs']);
  grunt.registerTask('copyAllCss', ['copy:copyLibsMinCss']);
  grunt.registerTask('copyAll', ['copy']);
  grunt.registerTask('zip', ['uglify']);


  grunt.registerTask('run', ['copy', 'jshint']);
};
