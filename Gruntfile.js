module.exports = function(grunt) {

grunt.initConfig({
  less: {
    production: {
      options: {
        cleancss: true,
        compress: true,
        paths: ["bower_components/bootstrap/dist/css", "css"],
        yuicompress: true
      },
      files: {
        "assets/css/style.css": "assets/_less/style.less"
      }
    }
  },
  imagemin: {                          // Task
    dynamic: {                         // target
      files: [{
        expand: true,                  // Enable dynamic expansion
        cwd: 'assets/_images/',        // Src matches are relative to this path
        src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
        dest: 'assets/images/'         // Destination path prefix
      }]
    }
  },
  exec: {
    build: {
      cmd: 'jekyll build'
    },
    serve: {
      cmd: 'jekyll serve --watch'
    }
  }
});

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-exec');

//grunt.registerTask('default', [ 'less', 'uglify', 'copy', 'exec:build' ]);
grunt.registerTask('default', [ 'less', 'imagemin' ]);

};
