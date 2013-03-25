module.exports = function(grunt) {

  grunt.initConfig({

    // Meta informations
    // pkg: '<json:package.json>',
    pkg: grunt.file.readJSON('package.json'),
    
    meta: {
      banner: '/*\n' +
        ' *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
        ' *  <%= pkg.description %>\n' +
        ' *  <%= pkg.homepage %>\n\n' +
        ' *  Copyright (c) <%= grunt.template.today("yyyy") %>\n' +
        ' *  MIT License\n' +
        ' */'
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/jquery.github.js>'],
        dest: 'dist/jquery.github.js'
      }
    },

    // Lint definitions
    lint: {
      files: ['src/jquery.github.js']
    },

    jshint: {
      options: {
        multistr: true
      }
    },

    jasmine : {
      src : 'src/**/*.js',
      options : {
        specs : 'spec/*spec.js',
        helpers: 'spec/helpers/*.js'
      }
    },
    // Minify definitions
    minify: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/jquery.github.min.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('default', ['lint'], ['minify'], ['concat']);
  grunt.registerTask('travis', 'lint');

};