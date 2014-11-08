module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['src/*.js']
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= pkg.version %> Copyright © <%= grunt.template.today("yyyy") %> <%= pkg.author %> - Released under the MIT Licence */\n'
			},
			files: {
				src: 'src/*.js',
				dest: 'dist/',
				expand: true,
				flatten: true,
				ext: '.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jshint', 'uglify']);

};