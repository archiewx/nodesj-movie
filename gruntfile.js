module.exports = function (grunt) {

	grunt.initConfig({
		jshint: {
			build: ['*.js', './public/js/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},     
		watch: { 
			jade: {
				files: ['views/**'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			}
		},
		nodemon: {
			dev: {
				options: {
					file: 'app.js',
					args: [],
					ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
					watchedExtensions: ['js'],
					watchedFolders: ['./'],
					debug: true,
					delayTime: 1,
					env: {
						PORT: 3000
					},
					cwd: __dirname
				}
			}
		},
		concurrent: {
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		}


	})

	// 便于开发不让警告和错误中断任务
	grunt.option('force', true);


	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('default',['concurrent']);

}