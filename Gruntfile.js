module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    concat: {
      dist: {
        src: [
          'src-js/vendor/jquery-3.2.1.js',
          'src-js/vendor/jquery.onepage-scroll.js',
          'src-js/vendor/velocity.js',
          'src-js/vendor/velocity.ui.js',
          'src-js/vendor/imagesloaded.pkgd.js',
          'src-js/vendor/slick.js',
          'src-js/main.js'
        ],
        dest: 'js/main.js'
      }
    },
    uglify: {
      my_target: {
        files: {
          'js/main.min.js': ['js/main.js']
        }
      }
    },
    sass: {
      dist: {
        files: {
          'css/main.css': 'sass/000-main.scss'
        }
      }
    },
    watch: {
      options: {
        atBegin: true
      },
      js: {
        files: ['src-js/*.js'],
        tasks: ['concat']
      },
      minjs: {
        files: ['js/main.js'],
        tasks: ['uglify']
      },
      watchSass: {
        files: ['sass/*.scss'],
        tasks: ['sass']
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.registerTask('default', ['concat', 'watch'])
}
