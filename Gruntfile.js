module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
              // define a string to put between each file in the concatenated output
              separator: ';'
            },
            dist: {
              // the files to concatenate
              src: [
                'src/js/config/localstorage.js',
                'src/js/config/router.js',
                'src/js/api/api.js',
                'src/js/helper.js',
                'src/js/app.js',
              ],
              // the location of the resulting JS file
              dest: 'dist/app.js'
            }
          },
          uglify: {
            dist: {
              files: {
                'dist/app.js': ['src/js/*.js']
              }
            }
          }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('development', ['concat']);
    grunt.registerTask('production', ['concat','uglify']);

};

